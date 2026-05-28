"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import "./stats.css";

const faqs = [
  {
    question: "How old must players be?",
    answer:
      "Butterfly Basketball Academy welcomes players between 4 and 18 years old.",
  },
  {
    question: "Do players need previous basketball experience?",
    answer:
      "No. We welcome beginners, intermediate players, and advanced athletes. Our programs are designed to help every player grow at their own pace.",
  },
  {
    question: "Are parents allowed to watch practice?",
    answer:
      "Yes. Parents are welcome to observe practices and follow their child's development throughout the season.",
  },
  {
    question: "What should players bring to practice?",
    answer:
      "Players should bring basketball shoes, athletic clothing, a water bottle, and a positive attitude ready to learn and compete.",
  },
  {
    question: "How are teams formed?",
    answer:
      "Teams are organized based on age, skill level, development goals, and competitive balance to provide the best learning experience.",
  },
  {
    question: "How do registrations work?",
    answer:
      "To register, simply complete the registration form available in the User Dashboard under the Forms section. Once submitted, our staff will review your application and contact you with the next steps.",
  },
];

export default function Stats() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="stats">
      <div className="stats__overlay"></div>

      <div className="stats__container">
        <div className="stats__header">
          <span className="stats__subtitle">FREQUENTLY ASKED QUESTIONS</span>

          <h2 className="stats__title">
            HAVE QUESTIONS?
            <br />
            WE HAVE ANSWERS.
          </h2>

          <p className="stats__description">
            Find answers to the most common questions about Butterfly Basketball
            Academy programs, registration, training, and player development.
          </p>
        </div>

        <div className="faq">
          {faqs.map((faq, index) => (
            <div
              className={`faq__item ${
                openIndex === index ? "faq__item--active" : ""
              }`}
              key={index}
            >
              <button
                className="faq__question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>

                {openIndex === index ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>

              <div
                className={`faq__answer ${
                  openIndex === index ? "faq__answer--open" : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
