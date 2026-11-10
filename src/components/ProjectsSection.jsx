import {
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  Gamepad2,
  Github,
  ListChecks,
  Lock,
  Sparkles,
} from "lucide-react";
import { projects } from "@/data/projects";
import { socials } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

// Header art for projects that don't have a screenshot.
const kindIcons = {
  list: ListChecks,
  game: Gamepad2,
  database: Database,
  lock: Lock,
};

const ProjectArt = ({ project }) => {
  if (project.image) {
    return (
      <div className="h-48 overflow-hidden bg-secondary">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  const Icon = kindIcons[project.kind] ?? Code2;

  return (
    <div
      aria-hidden="true"
      className="flex h-28 items-center justify-center bg-linear-to-br from-primary/15 to-primary/5"
    >
      <Icon className="h-10 w-10 text-primary/70 transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
};

const Tag = ({ children }) => (
  <li className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
    {children}
  </li>
);

const ProjectLinks = ({ project }) => (
  <div className="flex items-center gap-3">
    {project.demoUrl && (
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the live demo of ${project.title}`}
        className="inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-300 hover:text-primary"
      >
        <ExternalLink size={18} aria-hidden="true" />
        <span>Live demo</span>
      </a>
    )}
    {project.githubUrl && (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View the source code of ${project.title} on GitHub`}
        className="inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-300 hover:text-primary"
      >
        <Github size={18} aria-hidden="true" />
        <span>Code</span>
      </a>
    )}
  </div>
);

const FeaturedProject = ({ project }) => (
  <Reveal className="mb-12 overflow-hidden rounded-2xl border border-border bg-card text-left">
    <div className="border-b border-border bg-primary/5 px-6 py-4 sm:px-8">
      <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
        <Sparkles size={16} aria-hidden="true" />
        Featured — Capstone Project
      </p>
    </div>

    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <h3 className="text-2xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>

        <p className="mt-4 text-muted-foreground">{project.description}</p>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground/70">
          My role — {project.role}
        </h4>
        <ul className="mt-3 space-y-2">
          {project.contributions.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
          Tools
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ul>

        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  </Reveal>
);

const githubProfile = socials.find((s) => s.icon === "github").href;

export const ProjectsSection = () => {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Projects"
          title="Featured"
          accent="Projects"
          description="Things I've built — from a team capstone deployed with Docker and GitHub Actions to smaller projects I used to learn the fundamentals."
        />

        {featured && <FeaturedProject project={featured} />}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 90}
              className="card-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left"
            >
              <ProjectArt project={project} />

              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ul>

                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.year && (
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {project.year}
                    </span>
                  )}
                </div>
                <p className="mb-6 flex-1 text-sm text-muted-foreground">
                  {project.description}
                </p>

                <ProjectLinks project={project} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            className="cosmic-button mx-auto w-fit"
            target="_blank"
            rel="noopener noreferrer"
            href={githubProfile}
          >
            Check My GitHub <ArrowRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
