import {
  Trophy,
  Users,
  Dumbbell,
  Target,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import "./programs-page.css";

const programs = [
  {
    title: "SKILLS DEVELOPMENT",
    level: "Beginner • Intermediate",
    image: "/images/program-1.png",
    description:
      "Focused basketball sessions designed to improve shooting, dribbling, passing, footwork and defensive fundamentals.",
  },
  {
    title: "ELITE PERFORMANCE",
    level: "Advanced Athletes",
    image: "/images/program-2.png",
    description:
      "High-level competitive training for players looking to maximize basketball IQ, speed, conditioning and game performance.",
  },
  {
    title: "TEAM TRAINING CAMP",
    level: "Teams & Groups",
    image: "/images/program-3.png",
    description:
      "Structured team practices that emphasize communication, strategy, discipline and real-game execution.",
  },
];

const benefits = [
  {
    icon: <Trophy size={30} />,
    title: "Competitive Mindset",
    description:
      "Develop discipline, confidence and leadership through high-level basketball training.",
  },
  {
    icon: <Users size={30} />,
    title: "Team Culture",
    description:
      "Build strong relationships and teamwork skills in a positive environment.",
  },
  {
    icon: <Dumbbell size={30} />,
    title: "Athletic Performance",
    description:
      "Improve speed, agility, endurance and overall physical conditioning.",
  },
  {
    icon: <Target size={30} />,
    title: "Technical Skills",
    description:
      "Master shooting, defense, ball handling and offensive decision making.",
  },
];

const stats = [
  {
    value: "500+",
    label: "Active Athletes",
  },
  {
    value: "25+",
    label: "Weekly Sessions",
  },
  {
    value: "10+",
    label: "Years Experience",
  },
  {
    value: "15+",
    label: "Championships",
  },
];

export default function ProgramsPageContent() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">BBA TRAINING PROGRAMS</span>

          <h2 className="page-title">Designed For Growth & Excellence</h2>

          <p className="page-text page-text--center">
            Our basketball programs are built to help players improve
            technically, physically and mentally through structured development,
            competitive training and professional coaching.
          </p>
        </div>

        <div className="programs-page-grid">
          {programs.map((program, index) => (
            <div className="program-page-card" key={index}>
              <div className="program-page-image-wrapper">
                <img
                  src={program.image}
                  alt={program.title}
                  className="program-page-image"
                />
              </div>

              <div className="program-page-content">
                <span className="program-page-age">{program.level}</span>

                <h3>{program.title}</h3>

                <p>{program.description}</p>

                <button>
                  Explore Program
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="programs-benefits">
          {benefits.map((benefit, index) => (
            <div className="programs-benefit" key={index}>
              <div className="programs-benefit__icon">{benefit.icon}</div>

              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="programs-extra">
          <div className="programs-extra__content">
            <span className="page-tag">WHY TRAIN WITH BBA</span>

            <h2 className="page-title">Professional Basketball Development</h2>

            <p className="page-text">
              Butterfly Basketball Academy provides a professional environment
              where athletes can improve their technical skills, physical
              conditioning and competitive mindset through elite coaching and
              structured training.
            </p>

            <div className="programs-extra__points">
              <div className="programs-extra__point">
                <ShieldCheck size={22} />

                <span>Certified and experienced coaching staff</span>
              </div>

              <div className="programs-extra__point">
                <ShieldCheck size={22} />

                <span>Safe and structured training environment</span>
              </div>

              <div className="programs-extra__point">
                <ShieldCheck size={22} />

                <span>Programs adapted to every skill level</span>
              </div>
            </div>
          </div>

          <div className="programs-extra__stats">
            {stats.map((stat, index) => (
              <div className="program-stat" key={index}>
                <h3>{stat.value}</h3>

                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
