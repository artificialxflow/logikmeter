"use client";
import Script from "next/script";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold me-4" href="#">Next.js Template</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex" id="navbarNav">
            <ul className="navbar-nav flex-row gap-2 mb-0">
              <li className="nav-item">
                <a className="nav-link active px-3" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#">Contact Us</a>
              </li>
            </ul>
            <div className="d-flex ms-lg-auto gap-2">
              <button className="btn btn-outline-primary" type="button">Login</button>
              <button className="btn btn-primary" type="button">Register</button>
            </div>
          </div>
        </div>
      </nav>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-qQ2iX+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
} 