import Link from "next/link";

import "./cta.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta__overlay"></div>

      <div className="cta__container">
        <div className="cta__content">
          <span className="cta__subtitle">JOIN THE ACADEMY</span>

          <h2 className="cta__title">START YOUR BASKETBALL JOURNEY TODAY</h2>

          <p className="cta__description">
            Become part of a competitive and inspiring environment designed to
            help every player grow on and off the court.
          </p>

          <div className="cta__quote">
            <p>
              “At Butterfly Basketball Academy, we believe every child is like a
              butterfly. A butterfly does not begin its journey with beautiful
              wings — it goes through a process of growth, struggle, patience,
              and transformation before it can truly fly.
            </p>

            <p>
              In the same way, our athletes come to us with potential, and
              through discipline, hard work, confidence, and guidance, they
              develop into strong young leaders both on and off the court.
            </p>

            <p>
              Our mission is bigger than basketball. We want every child to
              spread their wings, believe in themselves, and fly high in
              whatever direction life takes them.”
            </p>

            <span className="cta__author">— Coach C</span>
          </div>

          <Link href="/register" className="cta__button">
            REGISTER NOW
          </Link>
        </div>
      </div>
    </section>
  );
}
