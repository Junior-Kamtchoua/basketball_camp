import { Trophy, Dumbbell, Users, Target } from "lucide-react";
import "./CoachesPageContent.css";

const coaches = [
  {
    name: "Coach Michael",
    role: "Head Basketball Trainer",
    image: "/images/coach-1.png",
    experience: "12 Years Experience",
    description:
      "Specialized in player development, leadership and advanced basketball fundamentals.",
  },
  {
    name: "Coach Jordan",
    role: "Skills Development Coach",
    image: "/images/coach-2.png",
    experience: "8 Years Experience",
    description:
      "Focused on shooting mechanics, ball handling and offensive decision making.",
  },
  {
    name: "Coach David",
    role: "Strength & Conditioning Coach",
    image: "/images/coach-3.png",
    experience: "10 Years Experience",
    description:
      "Helps athletes improve speed, agility, endurance and physical performance.",
  },
];

const values = [
  {
    icon: <Trophy size={28} />,
    title: "Elite Coaching",
    description:
      "Professional coaching focused on technical and tactical development.",
  },
  {
    icon: <Users size={28} />,
    title: "Player Mentorship",
    description:
      "Guidance and support to help athletes grow on and off the court.",
  },
  {
    icon: <Dumbbell size={28} />,
    title: "Athletic Performance",
    description:
      "Structured conditioning programs designed for basketball athletes.",
  },
  {
    icon: <Target size={28} />,
    title: "Competitive Mindset",
    description:
      "Building discipline, confidence and mental toughness through sports.",
  },
];

export default function CoachesPageContent() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">OUR STAFF</span>

          <h2 className="page-title">Meet The Coaches Behind FBA</h2>

          <p className="page-text page-text--center">
            Our coaching staff is dedicated to helping every athlete maximize
            their potential through professional instruction, mentorship and
            competitive development.
          </p>
        </div>

        <div className="coach-grid">
          {coaches.map((coach, index) => (
            <div className="coach-card" key={index}>
              <div className="coach-image-wrapper">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="coach-image"
                />
              </div>

              <div className="coach-content">
                <span className="coach-role">{coach.role}</span>

                <h3>{coach.name}</h3>

                <p className="coach-experience">{coach.experience}</p>

                <p className="coach-description">{coach.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="coach-values">
          {values.map((value, index) => (
            <div className="coach-value" key={index}>
              <div className="coach-value__icon">{value.icon}</div>

              <h3>{value.title}</h3>

              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
