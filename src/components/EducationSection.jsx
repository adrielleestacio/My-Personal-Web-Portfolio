import { Award, CalendarDays, GraduationCap, MapPin, Presentation } from "lucide-react";
import { education, seminars } from "@/data/education";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export const EducationSection = () => {
  return (
    <section id="education" className="relative bg-secondary/40 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Background"
          title="Education &"
          accent="Training"
        />

        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ol className="relative space-y-8 pl-8">
              {/* The rail is its own element rather than a border so it can
                  fade out at the bottom instead of stopping dead. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-0 w-px bg-linear-to-b from-primary/60 via-border to-transparent"
              />

              {education.map((item, index) => (
                <Reveal
                  key={item.degree}
                  as="li"
                  delay={index * 100}
                  className="relative text-left"
                >
                  {/* Positioned against the item, so -left-8 lands on the
                      rail and the half-width shift centres the dot on it. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-0.5 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-border bg-background"
                  >
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  </span>

                  <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    <CalendarDays size={14} aria-hidden="true" />
                    {item.period}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">{item.degree}</h3>
                  <p className="text-muted-foreground">{item.school}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin size={14} aria-hidden="true" />
                    {item.location}
                  </p>

                  {item.notes.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.notes.map((note) => (
                        <li
                          key={note}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          <Award size={13} aria-hidden="true" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>

          {/* self-start, or one short seminar stretches the card into a tall
              empty box beside the timeline. */}
          <Reveal
            delay={150}
            className="self-start rounded-xl border border-border bg-card p-6 text-left"
          >
            <h3 className="mb-4 flex items-center gap-2.5 text-lg font-semibold">
              <span className="inline-flex rounded-lg bg-primary/10 p-2">
                <Presentation className="h-4 w-4 text-primary" aria-hidden="true" />
              </span>
              Seminars &amp; Trainings
            </h3>
            <ul className="space-y-5">
              {seminars.map((seminar) => (
                <li
                  key={seminar.title}
                  className="border-l-2 border-primary/30 pl-4"
                >
                  <p className="font-medium leading-snug">{seminar.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {seminar.venue}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {seminar.date}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
