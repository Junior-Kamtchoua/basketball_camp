import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <h2 className="footer__logo">FBA</h2>

            <p className="footer__description">
              Friendship Basketball Academy develops athletes through elite
              training, discipline and leadership.
            </p>
          </div>

          <div className="footer__links-wrapper">
            <div className="footer__links">
              <h3>Quick Links</h3>

              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/programs">Programs</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className="footer__links">
              <h3>Programs</h3>

              <Link href="/">Youth Training</Link>
              <Link href="/">Elite Academy</Link>
              <Link href="/">Private Coaching</Link>
              <Link href="/">Summer Camp</Link>
            </div>

            <div className="footer__links">
              <h3>Contact</h3>

              <p className="footer__contact">
                <IoLocationSharp className="footer__icon" />
                450 South Beauchamp Boulevard
              </p>

              <a
                href="https://wa.me/14232009555"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact footer__whatsapp"
              >
                <FaWhatsapp className="footer__icon whatsapp" />
                423 200 9555
              </a>

              <p className="footer__contact">
                <IoLocationSharp className="footer__icon" />
                Princeton, Texas 75407, USA
              </p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Friendship Basketball Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
