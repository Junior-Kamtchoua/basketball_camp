"use client";

import { useState } from "react";

import Modal from "@/components/ui/modal/Modal";

import EditUserForm from "../forms/EditUserForm";

import styles from "./EditUserButton.module.css";

type UserRole = "USER" | "ADMIN";

interface Props {
  user: {
    id: string;

    first_name: string;

    last_name: string;

    email: string;

    role: UserRole;
  };
}

export default function EditUserButton({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        Edit
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <EditUserForm user={user} onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
