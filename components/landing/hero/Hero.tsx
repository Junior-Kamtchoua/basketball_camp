import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__overlay"></div>

      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__subtitle">
            DEVELOPING PLAYERS. BUILDING LEADERS.
          </span>

          <p className="hero__title">
            MORE THAN <br />
            <span>BASKETBALL</span>
          </p>

          <p className="hero__description">
            At Friendship Basketball Academy, we build skills, character and
            confidence through expert training, teamwork and a commitment to
            excellence.
          </p>

          <div className="hero__buttons">
            <button className="hero__primary-btn">EXPLORE PROGRAMS</button>

            <button className="hero__secondary-btn">VIEW SCHEDULE</button>
          </div>
        </div>
      </div>
    </section>
  );
}
