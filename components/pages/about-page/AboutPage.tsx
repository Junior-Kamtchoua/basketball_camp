import { Trophy, Users, Dumbbell, Target } from "lucide-react";
import "./about-page.css";

export default function AboutPageContent() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-grid">
          <div>
            <img
              src="/images/about.png"
              alt="About BBA"
              className="page-image"
            />
          </div>

          <div>
            <span className="page-tag">WHO WE ARE</span>

            <h2 className="page-title">Building Leaders Through Basketball</h2>

            <p className="page-text">
              Butterfly Basketball Academy (FBA) is more than a basketball
              training center. We are a community dedicated to developing young
              athletes through discipline, teamwork, leadership and elite
              basketball education.
            </p>

            <p className="page-text">
              Our mission is to create an environment where players can improve
              their technical skills, physical conditioning and basketball IQ
              while also growing in confidence, character and responsibility.
            </p>

            <p className="page-text">
              At FBA, every training session is designed to help athletes unlock
              their full potential both on and off the court. We focus on
              fundamentals, game situations, mental toughness and competitive
              excellence.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature__icon">
                  <Trophy size={24} />
                </div>

                <div>
                  <h3>Elite Development</h3>

                  <p>
                    Professional basketball training programs for all levels.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="about-feature__icon">
                  <Users size={24} />
                </div>

                <div>
                  <h3>Strong Community</h3>

                  <p>
                    A positive environment built around teamwork and respect.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="about-feature__icon">
                  <Dumbbell size={24} />
                </div>

                <div>
                  <h3>Physical Conditioning</h3>

                  <p>Improve strength, endurance and athletic performance.</p>
                </div>
              </div>

              <div className="about-feature">
                <div className="about-feature__icon">
                  <Target size={24} />
                </div>

                <div>
                  <h3>Player Focused</h3>

                  <p>
                    Every athlete receives personalized guidance and support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <h3>500+</h3>
            <p>Active Players</p>
          </div>

          <div className="about-stat">
            <h3>25+</h3>
            <p>Professional Coaches</p>
          </div>

          <div className="about-stat">
            <h3>15+</h3>
            <p>Championship Titles</p>
          </div>

          <div className="about-stat">
            <h3>10+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
