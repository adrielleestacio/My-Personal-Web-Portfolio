import { Award, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import { education, seminars } from "@/data/education";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export const EducationSection = () => {
  return (
    <section id="education" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Background"
          title="Education &"
          accent="Training"
        />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ol className="relative space-y-8 border-l border-border pl-8">
              {education.map((item, index) => (
                <Reveal
                  key={item.degree}
                  as="li"
                  delay={index * 100}
                  className="text-left"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[13px] grid h-6 w-6 place-items-center rounded-full border border-border bg-background"
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

          <Reveal
            delay={150}
            className="rounded-xl border border-border bg-card p-6 text-left"
          >
            <h3 className="mb-4 text-lg font-semibold">
              Seminars & Trainings
            </h3>
            <ul className="space-y-5">
              {seminars.map((seminar) => (
                <li key={seminar.title}>
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
