"use client";

import { useMemo, useState } from "react";

import Table from "@/components/ui/table/Table";

import { Program } from "@/types/program";

import styles from "./ProgramsTable.module.css";

interface Props {
  programs: Program[];
}

export default function ProgramsTable({ programs }: Props) {
  const [search, setSearch] = useState("");

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) =>
      program.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [programs, search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Programs</h2>

        <input
          type="text"
          placeholder="Search programs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>

      {filteredPrograms.length === 0 ? (
        <div className={styles.empty}>
          <h3>No programs found</h3>

          <p>Create your first training program.</p>
        </div>
      ) : (
        <Table headers={["Program", "Price", "Duration", "Created"]}>
          {filteredPrograms.map((program) => (
            <tr key={program.id}>
              <td>{program.title}</td>

              <td>${Number(program.price).toLocaleString("en-US")}</td>

              <td>{program.duration_weeks} weeks</td>

              <td suppressHydrationWarning>
                {new Date(program.created_at).toLocaleDateString("en-US")}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
