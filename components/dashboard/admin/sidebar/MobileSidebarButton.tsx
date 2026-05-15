"use client";

import { FaBars } from "react-icons/fa";

import styles from "./MobileSidebarButton.module.css";

interface Props {
  onClick: () => void;
}

export default function MobileSidebarButton({ onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FaBars />
    </button>
  );
}
