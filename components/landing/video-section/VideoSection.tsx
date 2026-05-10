import "./video-section.css";

export default function VideoSection() {
  return (
    <section className="video-section">
      <video className="video-section__video" autoPlay muted loop playsInline>
        <source src="/videos/basketball-video.mp4" type="video/mp4" />
      </video>

      <div className="video-section__overlay"></div>

      <div className="video-section__content">
        <span className="video-section__subtitle">
          ELITE BASKETBALL TRAINING
        </span>

        <h2 className="video-section__title">DEVELOP YOUR GAME</h2>
      </div>
    </section>
  );
}
