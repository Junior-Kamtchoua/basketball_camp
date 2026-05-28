import { CalendarDays, Clock3, Trophy, Dumbbell } from "lucide-react";
import "./SchedulePageContent.css";

const schedule = [
  {
    day: "Monday",
    Training_Focus: "Skills Development",
    time: "5:00 PM - 7:00 PM",
    category: "Fundamentals",
  },
  {
    day: "Tuesday",
    Training_Focus: "Strength & Conditioning",
    time: "5:30 PM - 7:30 PM",
    category: "Fitness",
  },
  {
    day: "Wednesday",
    Training_Focus: "Elite Academy Training",
    time: "6:00 PM - 8:00 PM",
    category: "Advanced",
  },
  {
    day: "Thursday",
    Training_Focus: "Shooting & Ball Handling",
    time: "5:00 PM - 7:00 PM",
    category: "Skills",
  },
  {
    day: "Friday",
    Training_Focus: "Game Simulation",
    time: "5:30 PM - 8:00 PM",
    category: "Competition",
  },
  {
    day: "Saturday",
    Training_Focus: "Team Practice",
    time: "10:00 AM - 1:00 PM",
    category: "Teamwork",
  },
];

const highlights = [
  {
    icon: <CalendarDays size={28} />,
    title: "Structured Schedule",
    description:
      "Organized weekly sessions designed for progressive player development.",
  },
  {
    icon: <Clock3 size={28} />,
    title: "Flexible Training Times",
    description:
      "Programs scheduled to fit student-athlete availability and growth.",
  },
  {
    icon: <Dumbbell size={28} />,
    title: "Performance Focus",
    description:
      "Sessions include conditioning, technical drills and recovery training.",
  },
  {
    icon: <Trophy size={28} />,
    title: "Competitive Preparation",
    description:
      "Train with intensity and discipline to prepare for real competition.",
  },
];

export default function SchedulePageContent() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">TRAINING SCHEDULE</span>

          <h2 className="page-title">Weekly Academy Schedule</h2>

          <p className="page-text page-text--center">
            Our academy schedule is carefully structured to balance basketball
            fundamentals, physical conditioning and competitive development for
            athletes of all levels.
          </p>
        </div>

        <div className="schedule-table">
          <div className="schedule-row schedule-row--head">
            <span>Day</span>

            <span>Training_Focus</span>

            <span>Time</span>

            <span>Category</span>
          </div>

          {schedule.map((item, index) => (
            <div className="schedule-row" key={index}>
              <span>{item.day}</span>

              <span>{item.Training_Focus}</span>

              <span>{item.time}</span>

              <span className="schedule-category">{item.category}</span>
            </div>
          ))}
        </div>

        <div className="schedule-highlights">
          {highlights.map((highlight, index) => (
            <div className="schedule-highlight" key={index}>
              <div className="schedule-highlight__icon">{highlight.icon}</div>

              <h3>{highlight.title}</h3>

              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
