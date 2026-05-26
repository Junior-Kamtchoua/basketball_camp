"use client";

import { useState } from "react";

import { Mail, Phone, MapPin, Clock3, Send } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import "./ContactPageContent.css";

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendToWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `
New BBA Contact Request

Name: ${formData.firstName} ${formData.lastName}

Email: ${formData.email}

Phone: ${formData.phone}

Subject: ${formData.subject}

Message:
${formData.message}
`;

    const encodedMessage = encodeURIComponent(text);

    const phoneNumber = "14232009555";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-content-center">
          <span className="page-tag">CONTACT BBA</span>

          <h2 className="page-title">Lets Build Greatness Together</h2>

          <p className="page-text page-text--center">
            Whether you want to register as a player, partner with the academy
            or learn more about our programs.
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
                  Princeton, Texas
                  <br />
                  450 South Beauchamp Boulevard
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <FaWhatsapp size={24} />
              </div>

              <div>
                <h3>Whatsapp</h3>

                <p>423 200 9555</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <Mail size={24} />
              </div>

              <div>
                <h3>Email</h3>

                <p>cyrille.sandjon@yahoo.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon">
                <Clock3 size={24} />
              </div>

              <div>
                <h3>Working Hours</h3>

                <p>
                  Monday-Saturday
                  <br />
                  8:00AM - 7:00PM
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

          <form className="contact-form" onSubmit={sendToWhatsapp}>
            <div className="contact-form__row">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />

              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__row">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>

            <input
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Write your message..."
              onChange={handleChange}
            />

            <button type="submit">
              Send via WhatsApp
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
