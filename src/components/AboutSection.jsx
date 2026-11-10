import { Container, Download, FileText, Server, Code2 } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const focusAreas = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Building responsive interfaces with React, Next.js and Tailwind CSS, backed by Node.js, Django or FastAPI.",
  },
  {
    icon: Container,
    title: "Deployment & DevOps",
    description:
      "Containerising apps with Docker and automating builds and releases with GitHub Actions.",
  },
  {
    icon: Server,
    title: "Databases & APIs",
    description:
      "Designing schemas and queries across MySQL, PostgreSQL, SQL Server and MongoDB, exposed through REST APIs.",
  },
  {
    icon: FileText,
    title: "Testing & Documentation",
    description:
      "System testing on real devices and technical writing — including Chapters 1–4 of our capstone paper.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading eyebrow="About" title="About" accent="Me" />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <Reveal className="space-y-6 text-left">
            <h3 className="text-2xl font-semibold">
              IT student focused on web development and shipping real software
            </h3>

            {profile.bio.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a href={profile.resumeUrl} download className="ghost-button">
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {focusAreas.map((area, index) => (
              <Reveal
                key={area.title}
                delay={index * 90}
                className="gradient-border card-hover p-6 text-left"
              >
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                  <area.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h4 className="mb-2 text-lg font-semibold">{area.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {area.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
