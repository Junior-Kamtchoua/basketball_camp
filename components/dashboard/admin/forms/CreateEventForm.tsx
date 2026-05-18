"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import styles from "./CreateEventForm.module.css";

interface Team {
  id: string;

  name: string;
}

export default function CreateEventForm() {
  const [loading, setLoading] = useState(false);

  const [teams, setTeams] = useState<Team[]>([]);

  const [title, setTitle] = useState("");

  const [location, setLocation] = useState("");

  const [coachName, setCoachName] = useState("");

  const [teamId, setTeamId] = useState("");

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch("/api/graphql", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query: `
                  query {
                    teams {
                      id
                      name
                    }
                  }
                `,
          }),
        });

        const result = await response.json();

        setTeams(result.data.teams);
      } catch {
        toast.error("Failed to load teams");
      }
    }

    loadTeams();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!teamId) {
      toast.error("Select a team");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/events", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,

          location,

          coach_name: coachName,

          team_id: teamId,

          start_time: startTime,

          end_time: endTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create event");
      }

      toast.success("Event created successfully");

      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="text"
        placeholder="Coach name"
        value={coachName}
        onChange={(e) => setCoachName(e.target.value)}
      />

      <select
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        required
        className={styles.select}
      >
        <option value="">Select Team</option>

        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />

      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
