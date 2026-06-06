"use client";

import Link from "next/link";

import Image from "next/image";

import { useState } from "react";

import { usePathname } from "next/navigation";

import "./navbar.css";

const navLinks = [
  { label: "Home", href: "/" },

  { label: "Schedule", href: "/schedule" },

  { label: "Forms", href: "/forms" },

  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__logo" onClick={closeMenu}>
          <Image
            src="/images/logo1.png"
            alt="BBA Logo"
            width={170}
            height={50}
            priority
            className="navbar__logo-image"
          />
        </Link>

        <nav className={`navbar__nav ${isOpen ? "navbar__nav--active" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`navbar__link ${
                pathname === link.href ? "navbar__link--active" : ""
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <div className="navbar__actions">
            <Link href="/login" className="navbar__login" onClick={closeMenu}>
              LOGIN
            </Link>

            <Link
              href="/register"
              className="navbar__register"
              onClick={closeMenu}
            >
              REGISTER
            </Link>
          </div>
        </nav>

        <button
          className={`navbar__hamburger ${
            isOpen ? "navbar__hamburger--active" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>

          <span></span>

          <span></span>
        </button>
      </div>
    </header>
  );
}
