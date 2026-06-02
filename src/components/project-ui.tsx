import { useEffect, useState } from "react";
import type { ArchitectureLayer, ProjectScreenshot } from "../data/portfolio";
import { assetUrl } from "../lib/assetUrl";

export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ProjectScreenshots({ images }: { images: ProjectScreenshot[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = images.length;
  const active = images[activeIndex] ?? images[0];

  const goPrev = () => setActiveIndex((i) => (i - 1 + count) % count);
  const goNext = () => setActiveIndex((i) => (i + 1) % count);

  return (
    <div className="project-screenshots">
      <div className="project-screenshots-stack" aria-label="Product screenshots">
        {images.map((shot) => (
          <figure key={shot.src} className="project-screenshot-figure">
            <img src={assetUrl(shot.src)} alt={shot.alt} loading="lazy" />
            {shot.caption && <figcaption>{shot.caption}</figcaption>}
          </figure>
        ))}
      </div>

      <div className="project-screenshots-carousel" aria-roledescription="carousel">
        <div className="project-screenshots-carousel-viewport">
          <figure className="project-screenshot-figure">
            <img key={active.src} src={assetUrl(active.src)} alt={active.alt} />
            {active.caption && <figcaption>{active.caption}</figcaption>}
          </figure>
        </div>
        <div className="project-screenshots-carousel-controls">
          <button type="button" className="project-screenshots-nav" onClick={goPrev} aria-label="Previous screenshot">
            ‹
          </button>
          <div className="project-screenshots-dots" role="tablist" aria-label="Screenshot pages">
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
          <button type="button" className="project-screenshots-nav" onClick={goNext} aria-label="Next screenshot">
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

export function ProjectGalleryCarousel({
  images,
  initialIndex = 0,
  intervalMs = 3500,
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

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="project-modal-carousel project-page-carousel" aria-roledescription="carousel">
      <div className="project-modal-carousel-viewport">
        <img key={active.src} src={assetUrl(active.src)} alt={active.alt} />
      </div>
      {images.length > 1 && (
        <div className="project-modal-carousel-controls">
          <button type="button" className="project-modal-carousel-nav" onClick={goPrev} aria-label="Previous">
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
          <button type="button" className="project-modal-carousel-nav" onClick={goNext} aria-label="Next">
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

export function ProjectCardCarousel({
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
    <div className="project-card-carousel" aria-roledescription="carousel" aria-live="polite">
      <img key={active.src} src={assetUrl(active.src)} alt={active.alt} loading="lazy" />
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

export function ArchitectureTabs({ layers }: { layers: ArchitectureLayer[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ribbonOpen, setRibbonOpen] = useState(false);
  const [ribbonBounceStopped, setRibbonBounceStopped] = useState<Record<number, boolean>>({});
  const active = layers[activeIndex] ?? layers[0];
  const hasPanelImage = Boolean(active.panelImage);
  const showRibbonBounce = hasPanelImage && !ribbonOpen && !ribbonBounceStopped[activeIndex];

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
      <p className="architecture-subtitle">(configuration → optimise → simulate)</p>
      <div className="architecture-tabs" role="tablist" aria-label="Three-layer architecture">
        {layers.map((layer, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={layer.tabLabel}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn("architecture-tab", isActive && "architecture-tab-active")}
              onClick={() => setActiveIndex(index)}
            >
              {layer.tabLabel}
            </button>
          );
        })}
      </div>
      <div
        className={cn("architecture-panel", hasPanelImage && "architecture-panel-has-ribbon")}
        role="tabpanel"
      >
        <div className="architecture-panel-layout">
          <div className="architecture-panel-copy">
            <h5 className="architecture-panel-title">{active.title}</h5>
            <p>{active.description}</p>
          </div>

          {hasPanelImage && (
            <div className={cn("architecture-panel-ribbon", ribbonOpen && "architecture-panel-ribbon-open")}>
              <div className="architecture-panel-ribbon-drawer" aria-hidden={!ribbonOpen}>
                <img
                  src={assetUrl(active.panelImage!)}
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
                aria-label={ribbonOpen ? "Hide UI screenshot" : "Show UI screenshot"}
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
