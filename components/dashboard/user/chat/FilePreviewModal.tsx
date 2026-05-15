"use client";

import { X } from "lucide-react";

import styles from "./FilePreviewModal.module.css";

interface Props {
  fileUrl: string;

  onClose: () => void;
}

export default function FilePreviewModal({ fileUrl, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <X size={22} />
        </button>

        <img src={fileUrl} alt="Preview" className={styles.image} />
      </div>
    </div>
  );
}
