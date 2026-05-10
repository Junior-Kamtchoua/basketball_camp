import { Mail, Phone, MapPin, Clock3, Send } from "lucide-react";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function ContactPageContent() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">CONTACT FBA</span>

          <h2 className="page-title">Let&apos;s Build Greatness Together</h2>

          <p className="page-text page-text--center">
            Whether you want to register as a player, partner with the academy,
            or learn more about our programs, our team is ready to help you.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-card__icon">
                <MapPin size={24} />
              </div>

              <div>
                <h3>Academy Location</h3>

                <p>
                  Yaoundé, Cameroon
                  <br />
                  Friendship Basketball Academy
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <Phone size={24} />
              </div>

              <div>
                <h3>Phone Number</h3>

                <p>
                  +237 600 000 000
                  <br />
                  +237 699 000 000
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <Mail size={24} />
              </div>

              <div>
                <h3>Email Address</h3>

                <p>
                  contact@fba.com
                  <br />
                  support@fba.com
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <Clock3 size={24} />
              </div>

              <div>
                <h3>Working Hours</h3>

                <p>
                  Monday - Saturday
                  <br />
                  8:00 AM - 7:00 PM
                </p>
              </div>
            </div>

            <div className="contact-socials">
              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>

          <form className="contact-form">
            <div className="contact-form__row">
              <input type="text" placeholder="First Name" />

              <input type="text" placeholder="Last Name" />
            </div>

            <div className="contact-form__row">
              <input type="email" placeholder="Email Address" />

              <input type="text" placeholder="Phone Number" />
            </div>

            <input type="text" placeholder="Subject" />

            <textarea placeholder="Write your message here..."></textarea>

            <button type="submit">
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
