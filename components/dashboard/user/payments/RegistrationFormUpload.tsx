"use client";

import { useRef, useState } from "react";

import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";

import toast from "react-hot-toast";

import styles from "./RegistrationFormUpload.module.css";

export default function RegistrationFormUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState(false);

  const [uploadedUrl, setUploadedUrl] = useState("");

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF and image files are allowed.");

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload-registration-form", {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedUrl(data.url);

      toast.success("Registration form uploaded successfully");
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <FileText size={34} />
        </div>

        <div className={styles.textContent}>
          <div className={styles.badge}>Required Document</div>

          <h2>Basketball Registration Form</h2>

          <p>
            Please upload your official basketball registration form before
            participating in academy activities. The admin team will review your
            document.
          </p>
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
              <Loader2 size={20} className={styles.spinner} />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={20} />
              Upload Registration Form
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
