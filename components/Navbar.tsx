"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import SignUpModal from "@/components/SignUpModal";

import AccountSvg from "./svg/AccountSvg";

import logo from "@/public/images/logo.png";

import "./Navbar.scss";
import DashboardSvg from "./svg/DashboardSvg";

type SignModalType = "signIn" | "signUp";

const NavBar = () => {
  const [isMenuListOpen, setIsMenuListOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signType, setSignType] = useState<SignModalType>("signIn");

  const toggleSignModal = () => {
    setIsSignModalOpen((prev) => !prev);
  };

  const handleDesktopAuth = (type: SignModalType) => {
    setSignType(type);
    setIsSignModalOpen(true);
  };

  return (
    <nav className="navbar section-wide">
      <Link
        href={`/testing`}
        style={{
          position: "absolute",
          top: "20px",
          left: "120px",
          border: "1px solid red",
          zIndex: "2",
        }}
      >
        TEST PAGE
      </Link>
      <SignUpModal
        toggleSignModal={toggleSignModal}
        isSignModalOpen={isSignModalOpen}
        signType={signType}
      />
      <div className="navbar-content section-narrow">
        <Link href={`/`} className="logo">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            style={{ height: "auto" }}
          />
          <span>Billz</span>
        </Link>
        <div className="navbar-functions">
          <button className="btn-signup" onClick={() => toggleSignModal()}>
            <AccountSvg />
          </button>
          <Link href={`/dashboard`} className="dash-link">
            <DashboardSvg />
            <span>Dashboard</span>
          </Link>
          <button
            className={`menu-btn ${isMenuListOpen ? "closedesign" : ""}`}
            onClick={() => setIsMenuListOpen((prev) => !prev)}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
        </div>

        <ul className={`menu-list ${isMenuListOpen ? "isopen" : ""}`}>
          <li>
            <Link
              href={`/dashboard/issuing/invoice`}
              onClick={() => setIsMenuListOpen(false)}
            >
              Factureaza
            </Link>
          </li>
          <li>
            <Link href={`/`} onClick={() => setIsMenuListOpen(false)}>
              Preturi
            </Link>
          </li>
          <li>
            <Link href={`/`} onClick={() => setIsMenuListOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="desktop-auth">
          <button
            className="btn-empty"
            onClick={() => handleDesktopAuth("signIn")}
          >
            Autentificare
          </button>
          <span>SAU</span>
          <button
            className="btn-yellow"
            onClick={() => handleDesktopAuth("signUp")}
          >
            Incepe gratuit
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
