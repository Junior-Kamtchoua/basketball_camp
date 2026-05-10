import { Trophy, Users, Dumbbell, ShieldCheck } from "lucide-react";

import "./features.css";

const features = [
  {
    icon: <Trophy size={60} />,
    title: "Elite Training",
    description:
      "Professional basketball development programs for all skill levels.",
  },
  {
    icon: <Users size={60} />,
    title: "Team Spirit",
    description:
      "Build leadership, teamwork and discipline on and off the court.",
  },
  {
    icon: <Dumbbell size={60} />,
    title: "Physical Fitness",
    description:
      "Improve strength, agility, endurance and athletic performance.",
  },
  {
    icon: <ShieldCheck size={60} />,
    title: "Safe Environment",
    description:
      "A structured and supportive academy focused on player growth.",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="features__container">
        {features.map((feature, index) => (
          <div className="feature__card" key={index}>
            <div className="feature__icon">{feature.icon}</div>

            <h3 className="feature__title">{feature.title}</h3>

            <p className="feature__description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
