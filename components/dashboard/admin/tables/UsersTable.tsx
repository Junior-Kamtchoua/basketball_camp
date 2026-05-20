"use client";

import { useMemo, useState } from "react";

import Table from "@/components/ui/table/Table";

import Pagination from "@/components/ui/pagination/Pagination";

import DeleteUserButton from "./DeleteUserButton";

import EditUserButton from "./EditUserButton";

import styles from "./UsersTable.module.css";

type UserRole = "USER" | "ADMIN";

interface User {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  role: UserRole;

  is_active: boolean;

  created_at: string;

  basketball_registration_form_url?: string | null;

  registration_form_id?: string | null;

  form_type?: "CAMP" | "CLUB" | null;

  registration_status?: "PENDING" | "APPROVED" | "REJECTED" | null;

  submitted_at?: string | null;

  team_id?: string | null;

  team_name?: string | null;
}

interface Props {
  users: User[];
}

const ITEMS_PER_PAGE = 8;

export default function UsersTable({ users }: Props) {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-GB").format(new Date(date));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Users</h2>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            setPage(1);
          }}
          className={styles.search}
        />
      </div>

      <Table
        headers={[
          "Name",
          "Email",
          "Registration Form",
          "Team",
          "Role",
          "Status",
          "Created",
          "Actions",
        ]}
      >
        {paginatedUsers.map((user) => (
          <tr key={user.id}>
            <td>
              {user.first_name} {user.last_name}
            </td>

            <td>{user.email}</td>

            <td>
              {user.registration_form_id ? (
                <div className={styles.registrationInfo}>
                  <span className={styles.formBadge}>
                    {user.form_type} FORM
                  </span>

                  <span
                    className={`${styles.formStatus} ${
                      user.registration_status === "APPROVED"
                        ? styles.approved
                        : user.registration_status === "REJECTED"
                          ? styles.rejected
                          : styles.pending
                    }`}
                  >
                    {user.registration_status}
                  </span>
                </div>
              ) : user.basketball_registration_form_url ? (
                <div className={styles.documentActions}>
                  <a
                    href={user.basketball_registration_form_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.documentButton}
                  >
                    View
                  </a>

                  <a
                    href={`${user.basketball_registration_form_url}?fl_attachment=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadButton}
                  >
                    Download
                  </a>
                </div>
              ) : (
                <span className={styles.noDocument}>No Form</span>
              )}
            </td>

            <td>{user.team_name || "No Team"}</td>

            <td>{user.role}</td>

            <td>
              <span
                className={user.is_active ? styles.active : styles.inactive}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </td>

            <td suppressHydrationWarning>{formatDate(user.created_at)}</td>

            <td className={styles.actions}>
              <EditUserButton user={user} />

              <DeleteUserButton userId={user.id} />
            </td>
          </tr>
        ))}
      </Table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
