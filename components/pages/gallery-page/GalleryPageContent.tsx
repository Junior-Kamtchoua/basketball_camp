import { Camera, Trophy, Users, Dumbbell } from "lucide-react";
import "./GalleryPageContent.css";
const images = [
  {
    image: "/images/gallery-1.png",
    title: "Elite Training Session",
    category: "Training",
  },
  {
    image: "/images/gallery-2.png",
    title: "Team Practice",
    category: "Academy",
  },
  {
    image: "/images/gallery-3.png",
    title: "Game Day Experience",
    category: "Competition",
  },
  {
    image: "/images/gallery-4.png",
    title: "Youth Development",
    category: "Players",
  },
  {
    image: "/images/gallery-5.png",
    title: "Skills Development",
    category: "Training",
  },
  {
    image: "/images/gallery-6.png",
    title: "Championship Spirit",
    category: "Events",
  },
];

const highlights = [
  {
    icon: <Camera size={28} />,
    title: "Academy Moments",
    description:
      "Discover unforgettable moments from practices, games and events.",
  },
  {
    icon: <Users size={28} />,
    title: "Team Culture",
    description:
      "A strong basketball family focused on discipline and teamwork.",
  },
  {
    icon: <Dumbbell size={28} />,
    title: "Player Development",
    description: "Training sessions designed to improve athletic performance.",
  },
  {
    icon: <Trophy size={28} />,
    title: "Competitive Excellence",
    description:
      "Celebrating victories, progress and championship achievements.",
  },
];

export default function GalleryPageContent() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">FBA GALLERY</span>

          <h2 className="page-title">Inside Friendship Basketball Academy</h2>

          <p className="page-text page-text--center">
            Explore moments from our training sessions, competitions, events and
            player development activities that define the FBA experience.
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((item, index) => (
            <div className="gallery-card" key={index}>
              <div className="gallery-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-image"
                />
              </div>

              <div className="gallery-content">
                <span className="gallery-category">{item.category}</span>

                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-highlights">
          {highlights.map((highlight, index) => (
            <div className="gallery-highlight" key={index}>
              <div className="gallery-highlight__icon">{highlight.icon}</div>

              <h3>{highlight.title}</h3>

              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
