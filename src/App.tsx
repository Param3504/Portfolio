import { useEffect, useState } from "react";
import {
  ABOUT_TABS,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  PROJECT_GRID_ORDER,
  SKILL_GROUPS,
  getProjectModalImages,
  type AboutTab,
  type ArchitectureLayer,
  type Experience,
  type Project,
  type ProjectScreenshot,
} from "./data/portfolio";
import "./App.css";

function ProjectScreenshots({ images }: { images: ProjectScreenshot[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = images.length;
  const active = images[activeIndex] ?? images[0];

  const goPrev = () => setActiveIndex((i) => (i - 1 + count) % count);
  const goNext = () => setActiveIndex((i) => (i + 1) % count);

  return (
    <div className="project-screenshots">
      <div
        className="project-screenshots-stack"
        aria-label="Product screenshots"
      >
        {images.map((shot) => (
          <figure key={shot.src} className="project-screenshot-figure">
            <img src={shot.src} alt={shot.alt} loading="lazy" />
            {shot.caption && <figcaption>{shot.caption}</figcaption>}
          </figure>
        ))}
      </div>

      <div
        className="project-screenshots-carousel"
        aria-roledescription="carousel"
      >
        <div className="project-screenshots-carousel-viewport">
          <figure className="project-screenshot-figure">
            <img key={active.src} src={active.src} alt={active.alt} />
            {active.caption && <figcaption>{active.caption}</figcaption>}
          </figure>
        </div>
        <div className="project-screenshots-carousel-controls">
          <button
            type="button"
            className="project-screenshots-nav"
            onClick={goPrev}
            aria-label="Previous screenshot"
          >
            ‹
          </button>
          <div
            className="project-screenshots-dots"
            role="tablist"
            aria-label="Screenshot pages"
          >
            {images.map((shot, index) => (
              <button
                key={shot.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={shot.caption ?? `Screenshot ${index + 1}`}
                className={cn(
                  "project-screenshots-dot",
                  index === activeIndex && "project-screenshots-dot-active",
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="project-screenshots-nav"
            onClick={goNext}
            aria-label="Next screenshot"
          >
            ›
          </button>
        </div>
        <p className="project-screenshots-counter" aria-live="polite">
          {activeIndex + 1} / {count}
        </p>
      </div>
    </div>
  );
}

function ProjectModalCarousel({
  images,
  initialIndex = 0,
  intervalMs = 2500,
}: {
  images: ProjectScreenshot[];
  initialIndex?: number;
  intervalMs?: number;
}) {
  const start = Math.min(Math.max(0, initialIndex), images.length - 1);
  const [activeIndex, setActiveIndex] = useState(start);

  useEffect(() => {
    setActiveIndex(start);
  }, [start, images]);

  const active = images[activeIndex] ?? images[0];

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="project-modal-carousel" aria-roledescription="carousel">
      <div className="project-modal-carousel-viewport">
        <img key={active.src} src={active.src} alt={active.alt} />
        {active.caption && (
          <p className="project-modal-carousel-caption">{active.caption}</p>
        )}
      </div>
      {images.length > 1 && (
        <div className="project-modal-carousel-controls">
          <button
            type="button"
            className="project-modal-carousel-nav"
            onClick={goPrev}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="project-modal-carousel-dots">
            {images.map((shot, index) => (
              <button
                key={shot.src}
                type="button"
                aria-label={shot.caption ?? `Slide ${index + 1}`}
                className={cn(
                  "project-modal-carousel-dot",
                  index === activeIndex && "project-modal-carousel-dot-active",
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="project-modal-carousel-nav"
            onClick={goNext}
            aria-label="Next"
          >
            ›
          </button>
          <span className="project-modal-carousel-counter">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = getProjectModalImages(project);
  const description =
    project.modalDescription ??
    project.stackSummary ??
    project.highlights.join(" ");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="project-modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="project-modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <header className="project-modal-header">
          <p className="project-modal-client">
            {project.client ?? project.period}
          </p>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="project-modal-subtitle">{project.subtitle}</p>
        </header>
        {images.length > 0 ? (
          <ProjectModalCarousel
            images={images}
            initialIndex={project.screenshotsInitialIndex}
          />
        ) : (
          <div className="project-modal-fallback-media">
            <img src={project.image} alt={project.title} />
          </div>
        )}
        <div className="project-modal-body">
          <p>{description}</p>
          <div className="project-modal-tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardCarousel({
  images,
  initialIndex = 0,
  intervalMs = 2000,
}: {
  images: ProjectScreenshot[];
  initialIndex?: number;
  intervalMs?: number;
}) {
  const start = Math.min(Math.max(0, initialIndex), images.length - 1);
  const [activeIndex, setActiveIndex] = useState(start);
  const active = images[activeIndex] ?? images[0];

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div
      className="project-card-carousel"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      <img key={active.src} src={active.src} alt={active.alt} loading="lazy" />
      <div className="project-card-carousel-dots" aria-hidden>
        {images.map((shot, index) => (
          <span
            key={shot.src}
            className={cn(
              "project-card-carousel-dot",
              index === activeIndex && "project-card-carousel-dot-active",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ArchitectureTabs({ layers }: { layers: ArchitectureLayer[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ribbonOpen, setRibbonOpen] = useState(false);
  const [ribbonBounceStopped, setRibbonBounceStopped] = useState<
    Record<number, boolean>
  >({});
  const active = layers[activeIndex] ?? layers[0];
  const hasPanelImage = Boolean(active.panelImage);
  const showRibbonBounce =
    hasPanelImage && !ribbonOpen && !ribbonBounceStopped[activeIndex];

  useEffect(() => {
    setRibbonOpen(false);
  }, [activeIndex]);

  const handleRibbonClick = () => {
    setRibbonBounceStopped((prev) => ({ ...prev, [activeIndex]: true }));
    setRibbonOpen((open) => !open);
  };

  return (
    <div className="architecture-layers">
      <h4 className="architecture-heading">Three-layer architecture</h4>
      <p className="architecture-subtitle">
        (configuration → optimise → simulate)
      </p>
      <div
        className="architecture-tabs"
        role="tablist"
        aria-label="Three-layer architecture"
      >
        {layers.map((layer, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={layer.tabLabel}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "architecture-tab",
                isActive && "architecture-tab-active",
              )}
              onClick={() => setActiveIndex(index)}
            >
              {layer.tabLabel}
            </button>
          );
        })}
      </div>
      <div
        className={cn(
          "architecture-panel",
          hasPanelImage && "architecture-panel-has-ribbon",
        )}
        role="tabpanel"
      >
        <div className="architecture-panel-layout">
          <div className="architecture-panel-copy">
            <h5 className="architecture-panel-title">{active.title}</h5>
            <p>{active.description}</p>
          </div>

          {hasPanelImage && (
            <div
              className={cn(
                "architecture-panel-ribbon",
                ribbonOpen && "architecture-panel-ribbon-open",
              )}
            >
              <div
                className="architecture-panel-ribbon-drawer"
                aria-hidden={!ribbonOpen}
              >
                <img
                  src={active.panelImage}
                  alt={active.panelImageAlt ?? active.title}
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                className={cn(
                  "architecture-panel-ribbon-handle",
                  showRibbonBounce && "architecture-panel-ribbon-handle-bounce",
                )}
                onClick={handleRibbonClick}
                aria-label={
                  ribbonOpen ? "Hide UI screenshot" : "Show UI screenshot"
                }
                aria-expanded={ribbonOpen}
              >
                <span className="architecture-panel-ribbon-chevron" aria-hidden>
                  {ribbonOpen ? "›" : "‹"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function SkillGroupIcon({ title }: { title: string }) {
  const lower = title.toLowerCase();
  if (lower.includes("language")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="skills-group-icon">
        <path d="M8 4h8v2H8zM6 8h12v2H6zM8 12h8v2H8zM10 16h4v2h-4z" />
      </svg>
    );
  }
  if (lower.includes("frontend") || lower.includes("web")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="skills-group-icon">
        <path d="M3 5h18v14H3zM5 7v10h14V7zM8 10l-2 2 2 2M16 10l2 2-2 2" />
      </svg>
    );
  }
  if (lower.includes("backend")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="skills-group-icon">
        <path d="M4 6h16v4H4zM4 14h16v4H4zM7 8h2M7 16h2M12 8h5M12 16h5" />
      </svg>
    );
  }
  if (lower.includes("chatbot") || lower.includes("ai")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="skills-group-icon">
        <path d="M4 5h16v10H8l-4 4zM8 9h2v2H8zM12 9h2v2h-2zM16 9h2v2h-2z" />
      </svg>
    );
  }
  if (lower.includes("deploy") || lower.includes("devops")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="skills-group-icon">
        <path d="M12 3l4 4h-3v5h-2V7H8zM5 14h14v7H5zM8 17h8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="skills-group-icon">
      <path d="M4 6h16v12H4zM8 10h8M8 14h5" />
    </svg>
  );
}

function highlightTermsInText(text: string, terms: string[]) {
  if (!terms.length) return text;

  const sorted = [...terms].sort((a, b) => b.length - a.length);
  const pattern = sorted
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    sorted.includes(part) ? (
      <strong key={`${part}-${index}`} className="about-kw">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function ExperienceTabs({ jobs }: { jobs: Experience[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const job = jobs[activeIndex] ?? jobs[0];

  return (
    <div className="about-tabs-wrap">
      <div
        className="about-tabs about-tabs-dynamic"
        style={{
          gridTemplateColumns: `repeat(${jobs.length}, minmax(0, 1fr))`,
        }}
        role="tablist"
        aria-label="Experience"
      >
        {jobs.map((entry, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn("about-tab", isActive && "about-tab-active")}
              onClick={() => setActiveIndex(index)}
            >
              {entry.tabLabel}
            </button>
          );
        })}
      </div>
      <div className="about-panel glass" role="tabpanel">
        <h3 className="about-panel-title">
          {job.company}
          <span className="experience-meta-inline">
            {" "}
            · {job.period} · {job.location}
          </span>
        </h3>
        <p className="experience-role">{job.role}</p>
        {job.intro && <p>{job.intro}</p>}
        <ul className="experience-bullets">
          {job.bullets.map((bullet) => (
            <li key={bullet.slice(0, 36)}>
              {job.highlightTerms?.length
                ? highlightTermsInText(bullet, job.highlightTerms)
                : bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AboutTabs({ tabs }: { tabs: AboutTab[] }) {
  const chatbotTabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === "chatbot-dev"),
  );
  const [activeIndex, setActiveIndex] = useState(chatbotTabIndex);
  const active = tabs[activeIndex] ?? tabs[0];

  return (
    <div className="about-tabs-wrap">
      <div className="about-tabs" role="tablist" aria-label="About">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn("about-tab", isActive && "about-tab-active")}
              onClick={() => setActiveIndex(index)}
            >
              {tab.tabLabel}
            </button>
          );
        })}
      </div>
      <div className="about-panel glass" role="tabpanel">
        <h3 className="about-panel-title">{active.title}</h3>

        {active.education ? (
          <div className="about-education">
            <p className="about-school">{PROFILE.education.school}</p>
            <p>{PROFILE.education.degree}</p>
            <p className="about-muted">
              {PROFILE.education.period} · {PROFILE.education.gpa}
            </p>
          </div>
        ) : (
          <>
            {active.paragraphs?.map((para, index) => (
              <p key={para.slice(0, 28)}>
                {index === active.highlightParagraphIndex &&
                active.highlightTerms
                  ? highlightTermsInText(para, active.highlightTerms)
                  : para}
              </p>
            ))}

            {active.projects && active.projects.length > 0 && (
              <div className="about-projects">
                {active.projects.map((project) => (
                  <article key={project.name} className="about-project">
                    <h4 className="about-project-head">
                      <span className="about-project-name">{project.name}</span>
                      <span className="about-project-sep" aria-hidden>
                        ·
                      </span>
                      <span className="about-project-client">
                        {project.client}
                      </span>
                    </h4>
                    <p>
                      {project.highlightTerms?.length
                        ? highlightTermsInText(
                            project.description,
                            project.highlightTerms,
                          )
                        : project.description}
                    </p>
                  </article>
                ))}
              </div>
            )}

            {active.responseTypes && active.responseTypes.length > 0 && (
              <div className="about-meta-block">
                <span className="about-meta-label">Response types</span>
                <div className="about-chips">
                  {active.responseTypes.map((type) => (
                    <span key={type} className="about-chip">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {active.clients && active.clients.length > 0 && (
              <div className="about-meta-block">
                <span className="about-meta-label">Clients</span>
                <div className="about-chips">
                  {active.clients.map((client) => (
                    <span key={client} className="about-chip about-chip-client">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function HeroBadgeIcon({ icon }: { icon: string }) {
  if (icon === "medal") {
    return (
      <svg className="hero-badge-icon" viewBox="0 0 64 72" aria-hidden>
        <circle cx="32" cy="28" r="18" fill="#d4a017" />
        <path
          fill="#e8c547"
          d="M32 14 L34 22 L42 22 L36 27 L38 35 L32 31 L26 35 L28 27 L22 22 L30 22 Z"
        />
        <path
          fill="#b8860b"
          d="M20 40 L14 58 L26 50 L32 58 L38 50 L50 58 L44 40 Z"
        />
      </svg>
    );
  }
  if (icon === "ai") {
    return (
      <svg className="hero-badge-icon" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2a7 7 0 0 1 7 7c0 2.8-1.6 5.2-4 6.3V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.7A7 7 0 0 1 5 9a7 7 0 0 1 7-7zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
        />
        <path fill="currentColor" d="M9 20h6v2H9z" opacity="0.85" />
      </svg>
    );
  }
  return (
    <svg className="hero-badge-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V5zm3 3h10v2H7V8zm0 4h7v2H7v-2z"
      />
    </svg>
  );
}

type ContactUspSlide = (typeof PROFILE.contactUspSlides)[number];

function ContactUspSlider({ slides }: { slides: readonly ContactUspSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="contact-usp-slider" aria-roledescription="carousel" aria-label="Core strengths">
      <div
        className="contact-usp-slider-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={cn(
              "contact-usp-slide glass",
              slide.emphasis && "contact-usp-slide-emphasis",
              index === activeIndex && "contact-usp-slide-active"
            )}
            aria-hidden={index !== activeIndex}
          >
            <div className="contact-usp-slide-media">
              <img src={slide.image} alt={slide.imageAlt} loading="lazy" />
            </div>
            <div className="contact-usp-slide-copy sr-only">
              <h3>{slide.title}</h3>
              <p>{slide.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="contact-usp-dots" role="tablist" aria-label="USP slides">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={slide.title}
            className={cn(
              "contact-usp-dot",
              index === activeIndex && "contact-usp-dot-active"
            )}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const CONTACT_LINKS = [
  {
    id: "email",
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: "mail",
  },
  {
    id: "phone",
    label: "Phone",
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone.replace(/\s/g, "")}`,
    icon: "phone",
  },
  {
    id: "github",
    label: "GitHub",
    value: "click here",
    href: PROFILE.github,
    icon: "github",
    external: true,
    clickHere: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "click here",
    href: PROFILE.linkedin,
    icon: "linkedin",
    external: true,
    clickHere: true,
  },
] as const;

function ContactLinkIcon({ icon }: { icon: string }) {
  if (icon === "mail") {
    return (
      <svg className="contact-link-icon" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v.2l8 5.2 8-5.2V8H4zm16 2.3l-7.4 4.8a1 1 0 0 1-1.2 0L4 10.3V16h16v-5.7z"
        />
      </svg>
    );
  }
  if (icon === "github") {
    return (
      <svg className="contact-link-icon" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
        />
      </svg>
    );
  }
  if (icon === "phone") {
    return (
      <svg className="contact-link-icon" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M6.5 3h2.2l1.1 4.6-2.1 1.2a12 12 0 0 0 5.5 5.5l1.2-2.1L18.4 13v2.2a1.5 1.5 0 0 1-1.4 1.5C9.8 17.2 6.8 14.2 5.5 7.9A1.5 1.5 0 0 1 6.5 3z"
        />
      </svg>
    );
  }
  return (
    <svg className="contact-link-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M4.5 3.5A2.5 2.5 0 1 1 9.5 8 2.5 2.5 0 0 1 4.5 3.5zM3 9h4v12H3V9zm7 0h4v1.7c.8-1.1 2.1-1.8 3.7-1.8 3.1 0 4.3 2 4.3 5.5V21h-4v-7.2c0-1.7-.6-2.9-2.2-2.9-1.2 0-1.9.8-2.2 1.6-.1.3-.2.7-.2 1.1V21h-4V9z"
      />
    </svg>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV[0].id);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState<
    "all" | "gen-ai" | "chatbot"
  >("all");

  useEffect(() => {
    const headerOffset = 96;

    const updateFromScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollY = window.scrollY;
      const viewportBottom = scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (viewportBottom >= docHeight - 100) {
        setActiveSection("contact");
        return;
      }

      let current = NAV[0].id;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + headerOffset >= top) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, []);

  const featured = PROJECTS.find((p) => p.featured);
  const gridProjects = PROJECT_GRID_ORDER.map((id) =>
    PROJECTS.find((p) => p.id === id),
  ).filter((p): p is Project => p != null);
  const genAiProjectIds = new Set([
    "trade-promo",
    "compass-data-companion",
    "pfizer-bot",
    "atlas",
  ]);
  const chatBotProjectIds = new Set([
    "compass-data-companion",
    "pfizer-bot",
    "atlas",
  ]);
  const filteredGridProjects = gridProjects.filter((project) => {
    if (projectFilter === "gen-ai") return genAiProjectIds.has(project.id);
    if (projectFilter === "chatbot") return chatBotProjectIds.has(project.id);
    return true;
  });

  return (
    <>
      <div className="bg-mesh" aria-hidden />
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#home" className="nav-logo">
            PP<span className="nav-dot">.</span>
          </a>
          <nav className="nav-links">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(activeSection === item.id && "nav-link-active")}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${PROFILE.email}`}
            className="btn btn-primary nav-cta"
          >
            Get in touch
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">Portfolio · Product Engineering</p>
              <h1 className="hero-title">
                Hi, I&apos;m{" "}
                <span className="text-gradient">{PROFILE.name}</span>
              </h1>
              <div className="hero-role-pills">
                {PROFILE.heroRoleChips.map((role) => (
                  <p key={role} className="hero-role-pill">
                    {role}
                  </p>
                ))}
              </div>
              <div className="hero-badges" aria-label="Highlights">
                {PROFILE.heroBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={cn(
                      "hero-badge glass",
                      `hero-badge-${badge.tone}`,
                    )}
                  >
                    <HeroBadgeIcon icon={badge.icon} />
                    <div className="hero-badge-text">
                      <p className="hero-badge-title">{badge.label}</p>
                      <p className="hero-badge-detail">{badge.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="hero-tagline">{PROFILE.tagline}</p>
              <div className="hero-stats" aria-label="Career highlights">
                {PROFILE.heroStats.map((stat) => (
                  <div key={stat.label} className="hero-stat">
                    <span className="hero-stat-value">{stat.value}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <p className="hero-mercor-note">
                Also worked as an independent contractor with{" "}
                <strong>Mercor</strong>, {PROFILE.mercorNote}
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  View projects
                </a>
                <a href="#contact" className="btn btn-outline btn-with-icon">
                  <svg
                    className="btn-icon"
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    aria-hidden
                  >
                    <path
                      fill="currentColor"
                      d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                    />
                  </svg>
                  Contact me
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  GitHub
                </a>
              </div>
              <div className="hero-meta">
                <span>{PROFILE.location}</span>
                <span className="meta-sep">·</span>
                <span>{PROFILE.education.degree}</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-ring">
                <img
                  src="/profile.png"
                  alt={PROFILE.name}
                  className="hero-image"
                  width={360}
                  height={360}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <span className="section-label">About</span>
            <h2 className="section-title">
              Building products that teams rely on
            </h2>
            <AboutTabs tabs={ABOUT_TABS} />
          </div>
        </section>

        <section id="experience" className="section section-alt">
          <div className="container">
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I&apos;ve worked</h2>
            <ExperienceTabs jobs={EXPERIENCE} />
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <span className="section-label">Projects</span>
            <h2 className="section-title">Most Recent Work</h2>
            <p className="section-intro">Entire Journey</p>

            {featured && (
              <article className="glass project-featured">
                <div
                  className={cn(
                    "project-featured-media",
                    featured.modalDescription && "project-card-clickable",
                  )}
                  onClick={
                    featured.modalDescription
                      ? () => setModalProject(featured)
                      : undefined
                  }
                  onKeyDown={
                    featured.modalDescription
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setModalProject(featured);
                          }
                        }
                      : undefined
                  }
                  role={featured.modalDescription ? "button" : undefined}
                  tabIndex={featured.modalDescription ? 0 : undefined}
                  aria-label={
                    featured.modalDescription
                      ? `Open ${featured.title} gallery`
                      : undefined
                  }
                >
                  {featured.screenshots && featured.screenshots.length > 0 ? (
                    <ProjectScreenshots images={featured.screenshots} />
                  ) : (
                    <img src={featured.image} alt={featured.title} />
                  )}
                </div>
                <div className="project-featured-body">
                  <p className="project-client">{featured.client}</p>
                  <h3>{featured.title}</h3>
                  <p className="project-subtitle">{featured.subtitle}</p>
                  <div className="project-tags">
                    {featured.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  {featured.stackSummary && (
                    <p className="project-stack-summary">
                      {featured.stackSummary}
                    </p>
                  )}
                  {featured.architectureLayers &&
                    featured.architectureLayers.length > 0 && (
                      <ArchitectureTabs layers={featured.architectureLayers} />
                    )}
                  <ul className="project-highlights">
                    {featured.highlights.map((h) => (
                      <li key={h.slice(0, 40)}>{h}</li>
                    ))}
                  </ul>
                </div>
              </article>
            )}

            <div className="project-grid-toolbar">
              <div>
                <h3 className="projects-subhead">All Projects</h3>
                <p className="projects-note">
                  These client projects are not available on my GitHub.
                </p>
              </div>
              <label className="project-filter-wrap">
                <span className="project-filter-label">Filter</span>
                <select
                  className="project-filter"
                  value={projectFilter}
                  onChange={(e) =>
                    setProjectFilter(
                      e.target.value as "all" | "gen-ai" | "chatbot",
                    )
                  }
                  aria-label="Filter projects by category"
                >
                  <option value="all">All</option>
                  <option value="gen-ai">Gen AI</option>
                  <option value="chatbot">Chat Bot</option>
                </select>
              </label>
            </div>

            <div className="project-grid">
              {filteredGridProjects.map((project) => (
                <article
                  key={project.id}
                  className="glass project-card project-card-clickable"
                  onClick={() => setModalProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setModalProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="project-card-media">
                    {project.cardScreenshots?.length ||
                    project.screenshots?.length ? (
                      <ProjectCardCarousel
                        images={
                          project.cardScreenshots ?? project.screenshots ?? []
                        }
                        initialIndex={project.screenshotsInitialIndex}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="project-card-body">
                    <span className="project-period">{project.period}</span>
                    <h3>{project.title}</h3>
                    <p>{project.cardSubtitle ?? project.subtitle}</p>
                    <div className="project-tags">
                      {project.tags.slice(0, 4).map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section section-alt">
          <div className="container">
            <span className="section-label">Skills</span>
            <h2 className="section-title">Toolbox</h2>
            <div className="skills-grid">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title} className="glass skills-card">
                  <h3>
                    <SkillGroupIcon title={group.title} />
                    <span>{group.title}</span>
                  </h3>
                  <div className="skills-list">
                    {group.items.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-layout">
            <div className="contact-header">
              <span className="section-label">Contact</span>
              <h2 className="contact-title">
                Let&apos;s build{" "}
                <span className="contact-title-accent">something</span>
                <span className="contact-title-dot">.</span>
              </h2>
              <p className="contact-lead">{PROFILE.contactCopy.lead}</p>
            </div>

            <div className="contact-row">
              <div className="contact-slider-col">
                <ContactUspSlider slides={PROFILE.contactUspSlides} />
              </div>

              <div className="contact-cards">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="glass contact-link-card"
                  {...("external" in link && link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <span className="contact-link-icon-wrap">
                    <ContactLinkIcon icon={link.icon} />
                  </span>
                  <span className="contact-link-text">
                    <span className="contact-link-label">{link.label}</span>
                    <span
                      className={cn(
                        "contact-link-value",
                        "clickHere" in link && link.clickHere && "contact-link-click-here"
                      )}
                    >
                      {link.value}
                    </span>
                  </span>
                </a>
              ))}
              </div>
            </div>

            <p className="contact-location">{PROFILE.contactCopy.location}</p>
          </div>

          <p className="contact-footer">
            <code className="contact-footer-git" aria-label='git commit -m "lets connect and build"'>
              <span className="contact-footer-cmd">git commit -m &quot;</span>
              <span className="contact-footer-msg">lets connect and build</span>
              <span className="contact-footer-cmd">&quot;</span>
            </code>
          </p>
        </section>
      </main>

      {modalProject && (
        <ProjectDetailModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </>
  );
}
