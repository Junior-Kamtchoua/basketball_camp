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

          <Link href="/register" className="cta__button">
            REGISTER NOW
          </Link>
        </div>
      </div>
    </section>
  );
}
