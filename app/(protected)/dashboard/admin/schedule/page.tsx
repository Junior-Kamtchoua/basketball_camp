import CreateEventForm from "@/components/dashboard/admin/forms/CreateEventForm";

import EventsTable from "@/components/dashboard/admin/schedule/EventsTable";

import { getEvents } from "@/services/events/getEvents";

import styles from "./page.module.css";

export default async function ScheduleAdminPage() {
  const events = await getEvents();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h1>Schedule Management</h1>

          <p>Create and manage basketball training events.</p>
        </div>
      </div>

      <CreateEventForm />

      <EventsTable events={events} />
    </div>
  );
}
