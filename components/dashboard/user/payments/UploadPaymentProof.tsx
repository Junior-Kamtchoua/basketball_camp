"use client";

import { useRef, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Upload, Loader2, CheckCircle2 } from "lucide-react";

import { Program } from "@/types/program";

import styles from "./UploadPaymentProof.module.css";

interface Props {
  programs: Program[];
}

export default function UploadPaymentProof({ programs }: Props) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const [programId, setProgramId] = useState("");

  const [amount, setAmount] = useState("");

  const [uploading, setUploading] = useState(false);

  async function handleSubmit() {
    try {
      if (!file) {
        toast.error("Please select a payment proof");

        return;
      }

      if (!programId) {
        toast.error("Please select a program");

        return;
      }

      if (!amount) {
        toast.error("Please enter the amount");

        return;
      }

      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append("amount", amount);

      formData.append("playerProgramId", programId);

      const response = await fetch("/api/payments/upload-proof", {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      toast.success("Payment proof uploaded");

      setFile(null);

      setAmount("");

      setProgramId("");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        return;
      }

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.top}>
        <div>
          <span className={styles.badge}>ZELLE PAYMENT</span>

          <h2>Upload Payment Proof</h2>

          <p>
            Upload your Zelle payment screenshot or receipt for admin approval.
          </p>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.group}>
          <label>Select Program</label>

          <select
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            className={styles.select}
          >
            <option value="">Choose program</option>

            {programs.map((program) => (
              <option
                key={program.player_program_id}
                value={program.player_program_id}
              >
                {program.title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label>Payment Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="250"
            className={styles.input}
          />
        </div>

        <div className={styles.group}>
          <label>Payment Proof</label>

          <input
            ref={inputRef}
            type="file"
            hidden
            accept=".png,.jpg,.jpeg,.pdf,.webp"
            onChange={(e) => {
              const selected = e.target.files?.[0];

              if (selected) {
                setFile(selected);
              }
            }}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={styles.uploadButton}
          >
            <Upload size={18} />

            {file ? file.name : "Choose payment proof"}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className={styles.submitButton}
        >
          {uploading ? (
            <>
              <Loader2 size={18} className={styles.spinner} />
              Uploading...
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              Submit Payment
            </>
          )}
        </button>
      </div>
    </section>
  );
}
