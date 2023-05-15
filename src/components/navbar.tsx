"use client";
import { useEffect, useState } from "react";
import $ from "jquery";
import Image from "next/image";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    $(".navbar-toggler").click(function () {
      setShowNav(!showNav);
    });
  }, [showNav]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <Image
            height={40}
            width={40}
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/2491/2491418.png"
          />
          <span style={{ fontSize: "22px" }}>Brain Tumor Finder</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showNav ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto ">
            <li className=" d-flex nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>

            <li className="nav-item active">
              <a className="nav-link" href="/search">
                Try
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/movie">
                Contact us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movie">
                Record
              </a>
            </li>
          </ul>
          <div className="navbar-nav">
            <a className="nav-link" href="/login">
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
