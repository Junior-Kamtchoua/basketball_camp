import { Server as IOServer } from "socket.io";

import { Server as HTTPServer } from "http";

interface SendMessagePayload {
  id?: string;

  sender_id: string;

  receiver_id: string;

  content: string;

  attachment_url?: string | null;

  created_at?: string;
}

interface TypingPayload {
  senderId: string;

  receiverId: string;
}

let io: IOServer | null = null;

const onlineUsers = new Map<string, string>();

export function initializeSocket(server: HTTPServer) {
  if (io) {
    return io;
  }

  io = new IOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    /*
       USER JOIN
      */

    socket.on("join", (userId: string) => {
      onlineUsers.set(userId, socket.id);

      io?.emit("online-users", Array.from(onlineUsers.keys()));
    });

    /*
       TYPING INDICATOR
      */

    socket.on("typing", (payload: TypingPayload) => {
      const receiverSocketId = onlineUsers.get(payload.receiverId);

      if (receiverSocketId) {
        io?.to(receiverSocketId).emit("typing", {
          senderId: payload.senderId,
        });
      }
    });

    /*
       SEND MESSAGE
      */

    socket.on("send-message", (message: SendMessagePayload) => {
      const receiverSocketId = onlineUsers.get(message.receiver_id);

      const messagePayload = {
        ...message,

        delivered: true,

        is_read: false,

        created_at: new Date().toISOString(),
      };

      /*
           SEND TO RECEIVER
          */

      if (receiverSocketId) {
        io?.to(receiverSocketId).emit("receive-message", messagePayload);

        /*
             LIVE NOTIFICATION
            */

        io?.to(receiverSocketId).emit("chat-notification", {
          sender_id: message.sender_id,

          content: message.content,
        });
      }

      /*
           SEND BACK TO SENDER
          */

      socket.emit("message-sent", messagePayload);
    });

    /*
       READ RECEIPTS
      */

    socket.on("mark-read", (messageId: string) => {
      socket.emit("message-read", {
        messageId,
      });
    });

    /*
       DISCONNECT
      */

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);

      onlineUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      });

      io?.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
}
