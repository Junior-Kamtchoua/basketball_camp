"use client";

import { useState } from "react";

import styles from "./GlobalSearch.module.css";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Global search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />

      {query && (
        <div className={styles.results}>
          <p>Searching for {query}</p>
        </div>
      )}
    </div>
  );
}
