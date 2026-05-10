import Link from "next/link";
import { ArrowRight } from "lucide-react";

import "./programs.css";

const programs = [
  {
    title: "SKILLS SESSIONS",
    description:
      "Weekly basketball development sessions for boys and girls ages 4-18.",
    image: "/images/hero2.png",
  },
  {
    title: "WEEKLY TRAINING PACKAGE",
    description:
      "2 consecutive trainings per week designed to take your game to the next level.",
    image: "/images/hero3.png",
  },
  {
    title: "MONTHLY TRAINING PACKAGE",
    description:
      "8 trainings over 4 weeks. Consistency is the key to improvement.",
    image: "/images/hero4.png",
  },
];

export default function Programs() {
  return (
    <section className="programs">
      <div className="programs__container">
        <div className="programs__header">
          <span className="programs__subtitle">OUR PROGRAMS</span>

          <h2 className="programs__title">TRAIN. GROW. SUCCEED.</h2>

          <div className="programs__line"></div>
        </div>

        <div className="programs__grid">
          {programs.map((program, index) => (
            <div className="program__card" key={index}>
              <div className="program__image-wrapper">
                <img
                  src={program.image}
                  alt={program.title}
                  className="program__image"
                />
              </div>

              <div className="program__content">
                <h3 className="program__title">{program.title}</h3>

                <p className="program__description">{program.description}</p>

                <Link href="/programs" className="program__button">
                  LEARN MORE
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
