"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Modal from "@/components/ui/modal/Modal";

import Button from "@/components/ui/form/Button";

import { PlayerOption } from "@/types/player-option";

import styles from "./AssignPlayerButton.module.css";

interface Props {
  teamId: string;

  players: PlayerOption[];
}

export default function AssignPlayerButton({ teamId, players }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedPlayerId, setSelectedPlayerId] = useState("");

  const [loading, setLoading] = useState(false);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const fullName = `${player.first_name} ${player.last_name}`;

      return (
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        player.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [players, search]);

  async function handleAssign() {
    if (!selectedPlayerId) {
      toast.error("Select a player");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/graphql", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query: `
              mutation AssignPlayerToTeam(
                $playerId: ID!
                $teamId: ID!
              ) {
                assignPlayerToTeam(
                  playerId: $playerId
                  teamId: $teamId
                ) {
                  success
                }
              }
            `,

          variables: {
            playerId: selectedPlayerId,

            teamId,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      toast.success("Player assigned successfully");

      setIsOpen(false);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Assignment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        Assign Player
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modalContent}>
          <div className={styles.top}>
            <h2>Assign Player</h2>

            <p>Select a player to assign to this team.</p>
          </div>

          <input
            type="text"
            placeholder="Search player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />

          <div className={styles.playersList}>
            {filteredPlayers.map((player) => {
              const isSelected = selectedPlayerId === player.id;

              return (
                <button
                  key={player.id}
                  type="button"
                  onClick={() => setSelectedPlayerId(player.id)}
                  className={`${styles.playerCard} ${
                    isSelected ? styles.selected : ""
                  }`}
                >
                  <div>
                    <strong>
                      {player.first_name} {player.last_name}
                    </strong>

                    <p>{player.email}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className={styles.actions}>
            <Button onClick={handleAssign} disabled={loading}>
              {loading ? "Assigning..." : "Assign Player"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
