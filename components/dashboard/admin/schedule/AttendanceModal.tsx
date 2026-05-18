"use client";

import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";

import Modal from "@/components/ui/modal/Modal";

import styles from "./AttendanceModal.module.css";

interface Player {
  player_id: string;

  user_id: string;

  full_name: string;

  team_name: string | null;
}

interface Props {
  isOpen: boolean;

  onClose: () => void;

  eventId: string;
}

export default function AttendanceModal({ isOpen, onClose, eventId }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);

  const [loading, setLoading] = useState(false);

  const loadPlayers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/events/${eventId}/players`);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setPlayers(data.players);
    } catch {
      toast.error("Failed to load players");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    let active = true;

    async function initialize() {
      if (!isOpen || !active) {
        return;
      }

      await loadPlayers();
    }

    initialize();

    return () => {
      active = false;
    };
  }, [isOpen, loadPlayers]);

  async function markAttendance(
    playerId: string,
    status: "PRESENT" | "ABSENT",
  ) {
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          player_id: playerId,

          event_id: eventId,

          status,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Attendance updated");
    } catch {
      toast.error("Failed to update attendance");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2>Mark Attendance</h2>

        {loading ? (
          <p>Loading players...</p>
        ) : (
          <div className={styles.list}>
            {players.map((player) => (
              <div key={player.player_id} className={styles.playerCard}>
                <div>
                  <h3>{player.full_name}</h3>

                  <p>{player.team_name}</p>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.present}
                    onClick={() => markAttendance(player.player_id, "PRESENT")}
                  >
                    Present
                  </button>

                  <button
                    className={styles.absent}
                    onClick={() => markAttendance(player.player_id, "ABSENT")}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
