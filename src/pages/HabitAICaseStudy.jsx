import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Boxes,
  ClipboardCheck,
  FileText,
  GitBranch,
  Github,
  Rocket,
  Smartphone,
  Users,
} from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

const project = projects.find((item) => item.id === "habitai");

const facts = [
  { label: "My role", value: project.role },
  { label: "Context", value: "Team capstone, BSIT · PSAU" },
  { label: "Shipped with", value: "Docker, GitHub Actions" },
  { label: "Status", value: "Proposal approved by the panel" },
];

// One entry per contribution listed on the project card, with the detail that
// did not fit on a card. Nothing here is claimed beyond that list.
const work = [
  {
    icon: Boxes,
    title: "Containerised the app",
    body: "I handled deployment, using Docker to package the app and its dependencies so it ran the same way on every machine we put it on, instead of each of us fighting a different local setup.",
  },
  {
    icon: Rocket,
    title: "Automated the builds and releases",
    body: "GitHub Actions took over the build and release steps, so a push produced a build without anyone running one by hand. That removed the step most likely to be forgotten the night before a milestone.",
  },
  {
    icon: GitBranch,
    title: "Ran source control for the team",
    body: "I managed the repository and the day-to-day Git workflow on GitHub, which is what kept a team's work merging instead of colliding.",
  },
  {
    icon: Smartphone,
    title: "Tested it on real Android",
    body: "I developed in Visual Studio Code and tested the app on Android through Android Studio, because a progressive web app behaves differently on a phone than it does in a desktop browser.",
  },
  {
    icon: FileText,
    title: "Co-wrote the paper",
    body: "I co-wrote Chapters 1 to 4 of the capstone paper. The proposal went to the panel and was approved.",
  },
  {
    icon: ClipboardCheck,
    title: "Prepared the system evaluation",
    body: "I prepared the evaluation of the system with 15 faculty respondents: the instrument, the run, and the results that went back into the paper.",
  },
];

export const HabitAICaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const previous = document.title;
    document.title = project.title + " — case study · " + profile.fullName;

    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 pb-24 pt-16">
        <article className="container mx-auto max-w-3xl">
          <Reveal>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to projects
            </Link>
          </Reveal>

          <Reveal className="mt-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              Case study
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">{project.title}</h1>
            <p className="mt-2 text-muted-foreground">{project.subtitle}</p>
          </Reveal>

          <Reveal className="mt-8 overflow-hidden rounded-2xl border border-border bg-secondary/40">
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={project.imageSize.w}
              height={project.imageSize.h}
              className="w-full object-cover"
            />
          </Reveal>

          <Reveal as="dl" className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-semibold">What it is</h2>
            <p className="mt-3 text-muted-foreground">{project.description}</p>
            <p className="mt-3 text-muted-foreground">
              It is a team project, and my half of it was everything that
              happens after the code works: getting it to build the same way
              twice, getting it onto a phone, and getting it written up.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-semibold">What I owned</h2>
            <ul className="mt-6 space-y-5">
              {work.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={index * 60}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/40"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-semibold">The stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold">See it</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.demoNote}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-button"
              >
                <Github size={16} aria-hidden="true" />
                View the repository
              </a>
              <a href={`mailto:${profile.email}`} className="cosmic-button">
                <Users size={16} aria-hidden="true" />
                Ask me for a walkthrough
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to projects
            </Link>
          </Reveal>
        </article>
      </main>

      <Footer />
    </div>
  );
};
