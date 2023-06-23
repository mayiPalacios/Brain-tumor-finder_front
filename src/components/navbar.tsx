"use client";
import { useEffect, useState } from "react";
import $ from "jquery";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const isLoggedIn = useAuth();
  const router = useRouter();
  useEffect(() => {
    $(".navbar-toggler").click(function () {
      setShowNav(!showNav);
    });
  }, [showNav]);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
  };

  return (
    <div className=" navContainer navbar navbar-expand-lg navbar-dark fixed-top navbar-custom">
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
            {isLoggedIn ? (
              <li className="nav-item active">
                <a className="nav-link" href="/try">
                  Try
                </a>
              </li>
            ) : (
              ""
            )}

            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact us
              </a>
            </li>
          </ul>

          {isLoggedIn ? (
            <div className="navbar-nav">
              <a className="nav-link" href="/login" onClick={handleLogout}>
                Logout
              </a>
              <a className="nav-link" href="/register">
                Register
              </a>
            </div>
          ) : (
            <div className="navbar-nav">
              <a className="nav-link" href="/singup">
                Sign up
              </a>
              <a className="nav-link" href="/login">
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
