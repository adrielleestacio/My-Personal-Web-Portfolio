import { useState } from "react";
import {
  Clock,
  Code,
  Database,
  Ear,
  Handshake,
  LayoutDashboard,
  MessageCircle,
  Server,
  Settings,
  Shuffle,
  Sparkles,
  Users,
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

const softIcons = {
  message: MessageCircle,
  ear: Ear,
  users: Users,
  shuffle: Shuffle,
  clock: Clock,
  handshake: Handshake,
};

/**
 * A skill chip with its brand logo. Falls back to the group's icon when the
 * skill has no brand mark, and hides the image if the CDN ever fails so a
 * broken-image icon never shows.
 */
const SkillChip = ({ skill, fallbackIcon }) => {
  const FallbackIcon = fallbackIcon;

  return (
  <li className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground">
    {skill.slug ? (
      <img
        src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
        alt=""
        aria-hidden="true"
        width="16"
        height="16"
        loading="lazy"
        className="h-4 w-4 shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    ) : (
      <FallbackIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
    )}
    {skill.name}
  </li>
  );
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
                    <SkillChip
                      key={skill.name}
                      skill={skill}
                      fallbackIcon={Icon}
                    />
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 rounded-xl border border-border bg-card p-6 text-left">
          <h3 className="mb-4 text-lg font-semibold">Soft Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {softSkills.map((skill) => {
              const SoftIcon = softIcons[skill.icon] ?? Sparkles;

              return (
                <li
                  key={skill.name}
                  className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                >
                  <SoftIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {skill.name}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
