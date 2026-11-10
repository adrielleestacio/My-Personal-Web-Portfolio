import { useState } from "react";
import {
  Code,
  Database,
  LayoutDashboard,
  Server,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { skillGroups, softSkills } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const icons = {
  code: Code,
  layout: LayoutDashboard,
  server: Server,
  database: Database,
  settings: Settings,
  sparkles: Sparkles,
};

const filters = [
  { id: "all", label: "All" },
  ...skillGroups.map((group) => ({ id: group.id, label: group.title })),
];

export const SkillsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleGroups =
    activeFilter === "all"
      ? skillGroups
      : skillGroups.filter((group) => group.id === activeFilter);

  return (
    <section id="skills" className="relative bg-secondary/40 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="My"
          accent="Skills"
          description="The languages, frameworks and tools I work with — grouped the way I actually use them."
        />

        <Reveal
          className="mb-12 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm transition-colors duration-300",
                activeFilter === filter.id
                  ? "bg-primary font-medium text-primary-foreground"
                  : "bg-card text-foreground/80 hover:bg-card hover:text-primary"
              )}
            >
              {filter.label}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group, index) => {
            const Icon = icons[group.icon] ?? Code;

            return (
              <Reveal
                key={group.id}
                delay={index * 80}
                className="card-hover rounded-xl border border-border bg-card p-6 text-left"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 rounded-xl border border-border bg-card p-6 text-left">
          <h3 className="mb-4 text-lg font-semibold">Soft Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
