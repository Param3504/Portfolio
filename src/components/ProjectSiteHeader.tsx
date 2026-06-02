import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PROFILE } from "../data/portfolio";
import { assetUrl } from "../lib/assetUrl";
import { cn } from "./project-ui";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export default function ProjectSiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className={cn("nav", scrolled && "nav-scrolled", mobileOpen && "nav-menu-open")}>
        <div className="container nav-inner project-site-header-inner">
          <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
            PP<span className="nav-dot">.</span>
          </Link>

          <nav className="nav-links nav-links-desktop project-site-nav" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.id}
                to="/"
                state={{ scrollTo: item.id }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-header-actions project-site-header-actions">
            <Link
              to="/"
              className="btn btn-outline project-page-nav-btn"
              onClick={() => setMobileOpen(false)}
            >
              Back to portfolio
            </Link>
            <Link
              to="/"
              state={{ scrollTo: "projects" }}
              className="btn btn-outline project-page-nav-btn"
              onClick={() => setMobileOpen(false)}
            >
              Back to projects
            </Link>
            <a
              href={assetUrl(`/${PROFILE.resume.file}`)}
              download={PROFILE.resume.downloadName}
              className="btn btn-primary nav-resume-header project-site-resume"
            >
              Resume
            </a>
          </div>

          <button
            type="button"
            className="nav-menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="project-nav-mobile-panel"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="nav-menu-bar" aria-hidden />
            <span className="nav-menu-bar" aria-hidden />
            <span className="nav-menu-bar" aria-hidden />
          </button>
        </div>
      </header>

      <div
        id="project-nav-mobile-panel"
        className={cn("nav-mobile-panel", mobileOpen && "nav-mobile-panel-open")}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
        />
        <div className="nav-mobile-sheet">
          <div className="nav-drawer-header">
            <Link to="/" className="nav-logo nav-drawer-logo" onClick={() => setMobileOpen(false)}>
              PP<span className="nav-dot">.</span>
            </Link>
            <button
              type="button"
              className="nav-drawer-close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="nav-drawer-divider" aria-hidden />
          <nav className="nav-drawer-links" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.id}
                to="/"
                state={{ scrollTo: item.id }}
                className="nav-drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                <span className="nav-drawer-link-label">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="project-site-mobile-actions">
            <Link
              to="/"
              className="btn btn-outline project-page-nav-btn"
              onClick={() => setMobileOpen(false)}
            >
              Back to portfolio
            </Link>
            <Link
              to="/"
              state={{ scrollTo: "projects" }}
              className="btn btn-outline project-page-nav-btn"
              onClick={() => setMobileOpen(false)}
            >
              Back to projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
