// server.js

import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;

const app = next({
  dev,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    await handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  /* ONLINE USERS */
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    /* JOIN USER */
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    /* SEND MESSAGE */
    socket.on("send-message", (message) => {
      /* REALTIME MESSAGE */
      io.emit("receive-message", message);

      /* RECEIVER NOTIFICATION */
      const receiverSocketId = onlineUsers.get(message.receiver_id);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat-notification");
      }
    });

    /* CLEAR CHAT NOTIFICATIONS */
    socket.on("clear-chat-notifications", () => {
      io.emit("clear-chat-notifications");
    });

    /* TYPING */
    socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data);
    });

    /* DISCONNECT */
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      }

      io.emit("online-users", Array.from(onlineUsers.keys()));

      console.log("Socket disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
