"use client";

import { useEffect, useState } from "react";

import { Users, CalendarDays, Trophy, CircleDot } from "lucide-react";

import "./stats.css";

const stats = [
  {
    icon: <Users size={60} />,
    value: 200,
    suffix: "+",
    label: "ATHLETES TRAINED",
  },
  {
    icon: <CalendarDays size={60} />,
    value: 5,
    suffix: "+",
    label: "YEARS OF IMPACT",
  },
  {
    icon: <Trophy size={60} />,
    value: 100,
    suffix: "+",
    label: "SUCCESS STORIES",
  },
  {
    icon: <CircleDot size={60} />,
    value: 10,
    suffix: "+",
    label: "COMPETITIVE TEAMS",
  },
];

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    let timer: NodeJS.Timeout;

    const runCounter = () => {
      timer = setInterval(() => {
        current += 1;

        setCount(current);

        if (current >= target) {
          clearInterval(timer);

          setTimeout(() => {
            current = 0;
            runCounter();
          }, 2500);
        }
      }, 40);
    };

    runCounter();

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}</>;
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats__overlay"></div>

      <div className="stats__container">
        <div className="stats__header">
          <h2 className="stats__title">MAKING AN IMPACT EVERY DAY</h2>

          <div className="stats__line"></div>
        </div>

        <div className="stats__grid">
          {stats.map((stat, index) => (
            <div className="stat__card" key={index}>
              <div className="stat__icon">{stat.icon}</div>

              <h3 className="stat__number">
                <Counter target={stat.value} />
                {stat.suffix}
              </h3>

              <p className="stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
