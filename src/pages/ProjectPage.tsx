import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  PROJECTS,
  getAdjacentProjectIds,
  getProjectById,
  getProjectModalImages,
  getProjectRouteOrder,
  getProjectThumbnail,
} from "../data/portfolio";
import { assetUrl } from "../lib/assetUrl";
import { HighlightText } from "../components/HighlightText";
import ProjectSiteHeader from "../components/ProjectSiteHeader";
import {
  ArchitectureTabs,
  ProjectGalleryCarousel,
  ProjectScreenshots,
  cn,
} from "../components/project-ui";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  useEffect(() => {
    document.title = project
      ? `${project.title} · ${import.meta.env.VITE_SITE_NAME ?? "Param Prajapati"}`
      : "Project · Portfolio";
    return () => {
      document.title = "Param Prajapati · Portfolio";
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/" replace state={{ scrollTo: "projects" }} />;
  }

  const images =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : getProjectModalImages(project);
  const description =
    project.modalDescription ?? project.stackSummary ?? project.highlights.join(" ");
  const { prev, next } = getAdjacentProjectIds(project.id);
  const related = PROJECTS.filter(
    (p) => p.id !== project.id && getProjectRouteOrder().includes(p.id),
  ).slice(0, 3);
  const hasArchitecture =
    project.architectureLayers && project.architectureLayers.length > 0;

  return (
    <div className="project-page">
      <div className="bg-mesh" aria-hidden />
      <ProjectSiteHeader />

      <section className="project-page-hero">
        <div className="container">
          <div className="project-page-hero-grid">
            <div className="project-page-hero-copy">
              <p className="project-page-eyebrow">
                {project.client ?? "Portfolio project"} · {project.period}
              </p>
              <h1>{project.title}</h1>
              <p className="project-page-subtitle">{project.subtitle}</p>
              <div className="project-tags project-page-tags">
                {project.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <p className="project-page-hero-focus">{project.cardSubtitle ?? project.subtitle}</p>
            </div>
            {images.length > 0 && (
              <div className="glass project-page-hero-media">
                <ProjectGalleryCarousel
                  images={images}
                  initialIndex={project.screenshotsInitialIndex}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section project-page-body">
        <div className="container project-page-body-grid">
          <article className="project-page-main glass">
            <span className="section-label">Overview</span>
            <h2 className="project-page-section-title">What I built</h2>
            <p className="project-page-description">
              <HighlightText text={description} />
            </p>
            {project.stackSummary && project.modalDescription && (
              <p className="project-page-stack">
                <HighlightText text={project.stackSummary} />
              </p>
            )}
            <ul className="project-highlights project-page-highlights">
              {project.highlights.map((h) => (
                <li key={h.slice(0, 48)}>
                  <HighlightText text={h} />
                </li>
              ))}
            </ul>
          </article>

          <aside className="project-page-sidebar">
            <div className="glass project-page-meta-card">
              <h3>At a glance</h3>
              <dl className="project-page-meta-list">
                <div>
                  <dt>Timeline</dt>
                  <dd>{project.period}</dd>
                </div>
                {project.client && (
                  <div>
                    <dt>Engagement</dt>
                    <dd>{project.client}</dd>
                  </div>
                )}
                <div>
                  <dt>Stack</dt>
                  <dd>{project.tags.slice(0, 5).join(" · ")}</dd>
                </div>
              </dl>
            </div>
            {(prev || next) && (
              <div className="glass project-page-nav-card">
                <h3>Explore more</h3>
                {prev && (
                  <Link to={`/projects/${prev.id}`} className="project-page-nav-link">
                    <span className="project-page-nav-dir">Previous</span>
                    <span className="project-page-nav-title">{prev.title}</span>
                  </Link>
                )}
                {next && (
                  <Link
                    to={`/projects/${next.id}`}
                    className={cn("project-page-nav-link", "project-page-nav-link-next")}
                  >
                    <span className="project-page-nav-dir">Next</span>
                    <span className="project-page-nav-title">{next.title}</span>
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      {hasArchitecture && (
        <section className="section section-alt project-page-architecture">
          <div className="container">
            <div className="project-page-architecture-shell glass">
              <span className="section-label">Architecture</span>
              <h2 className="project-page-section-title">How it works</h2>
              <ArchitectureTabs layers={project.architectureLayers!} />
            </div>
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="project-page-gallery section-tight">
          <div className="container">
            <span className="section-label">Product</span>
            <h2 className="project-page-section-title">Screenshots & flows</h2>
            <div className="glass project-page-gallery-shell">
              {images.length >= 3 ? (
                <ProjectScreenshots images={images} />
              ) : (
                <ProjectGalleryCarousel
                  images={images}
                  initialIndex={project.screenshotsInitialIndex}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section section-alt project-page-related">
          <div className="container">
            <span className="section-label">More work</span>
            <h2 className="section-title">Other projects</h2>
            <div className="project-page-related-grid">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="glass project-page-related-card"
                >
                  <img
                    src={assetUrl(getProjectThumbnail(p))}
                    alt={p.title}
                    loading="lazy"
                  />
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.cardSubtitle ?? p.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
