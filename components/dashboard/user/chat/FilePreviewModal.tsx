"use client";

import { Download, ExternalLink, X } from "lucide-react";

import styles from "./FilePreviewModal.module.css";

interface Props {
  fileUrl: string;

  onClose: () => void;
}

export default function FilePreviewModal({ fileUrl, onClose }: Props) {
  const isPdf = fileUrl.toLowerCase().endsWith(".pdf");

  const isImage =
    fileUrl.endsWith(".png") ||
    fileUrl.endsWith(".jpg") ||
    fileUrl.endsWith(".jpeg") ||
    fileUrl.endsWith(".webp");

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <button
            className={styles.action}
            onClick={() => window.open(fileUrl, "_blank")}
          >
            <ExternalLink size={18} />
          </button>

          <a href={fileUrl} download className={styles.action}>
            <Download size={18} />
          </a>

          <button className={styles.close} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {isPdf ? (
            <iframe src={fileUrl} className={styles.pdf} />
          ) : isImage ? (
            <img src={fileUrl} alt="Preview" className={styles.image} />
          ) : (
            <div className={styles.unsupported}>
              <p>Preview not available.</p>

              <a href={fileUrl} download>
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
