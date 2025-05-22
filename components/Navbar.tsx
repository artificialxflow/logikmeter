"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white me-4" href="/" style={{letterSpacing: '1px', fontSize: '1.3rem'}}>Brand</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" href="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" href="/contact">Contact</Link>
            </li>
          </ul>
          <div className="d-flex gap-2 ms-lg-auto">
            <button className="btn btn-outline-light px-4" type="button">Login</button>
            <button className="btn btn-light text-primary px-4" type="button">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
