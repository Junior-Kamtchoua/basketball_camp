import Link from "next/link";
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

              <p>Yaoundé, Cameroon</p>
              <p>+237 6 00 00 00 00</p>
              <p>contact@fba.com</p>
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
