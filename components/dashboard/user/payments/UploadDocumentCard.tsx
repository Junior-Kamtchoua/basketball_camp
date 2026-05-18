"use client";

import { useRef, useState } from "react";

import { Upload, Loader2, CheckCircle2, FileText } from "lucide-react";

import toast from "react-hot-toast";

import styles from "./UploadDocumentCard.module.css";

export default function UploadDocumentCard() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState(false);

  const [uploadedUrl, setUploadedUrl] = useState("");

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append("documentType", "PAYMENT_PROOF");

      const response = await fetch("/api/upload-document", {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedUrl(data.url);

      toast.success("Document uploaded successfully");
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon}>
          <FileText size={30} />
        </div>

        <div>
          <h2>Upload Payment Proof</h2>

          <p>Upload your Zelle screenshot, receipt or payment confirmation.</p>
        </div>
      </div>

      <div className={styles.actions}>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,image/*"
          onChange={handleUpload}
        />

        <button
          className={styles.uploadButton}
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 size={18} className={styles.spinner} />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              Upload Document
            </>
          )}
        </button>

        {uploadedUrl && (
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.previewButton}
          >
            <CheckCircle2 size={18} />
            View Uploaded File
          </a>
        )}
      </div>
    </section>
  );
}
