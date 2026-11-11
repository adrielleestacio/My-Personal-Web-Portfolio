import { Award, CalendarDays, ExternalLink, MapPin, ScrollText } from "lucide-react";
import { certificates } from "@/data/certificates";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export const CertificatesSection = () => {
  return (
    <section id="certificates" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Certificates &"
          accent="Awards"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 100}>
              <TiltCard>
                <div className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                  {/* Certificate icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <ScrollText className="h-6 w-6 text-primary" />
                  </div>

                  {/* Type badge */}
                  <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Award size={13} aria-hidden="true" />
                    {cert.type}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 text-base font-semibold leading-snug">
                    {cert.title}
                  </h3>

                  {/* Details */}
                  <div className="mb-4 space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <Award size={14} className="shrink-0 text-primary/60" aria-hidden="true" />
                      {cert.issuer}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CalendarDays size={14} className="shrink-0 text-primary/60" aria-hidden="true" />
                      {cert.date}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin size={14} className="shrink-0 text-primary/60" aria-hidden="true" />
                      {cert.venue}
                    </p>
                  </div>

                  {/* Spacer */}
                  <div className="mt-auto" />

                  {/* View button */}
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="View certificate"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    <ExternalLink size={15} />
                    View Certificate
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
