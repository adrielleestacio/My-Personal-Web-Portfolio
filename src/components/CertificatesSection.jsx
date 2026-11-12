import { Award, CalendarDays, ExternalLink, MapPin, ScrollText } from "lucide-react";
import { certificates } from "@/data/certificates";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

// A three-column grid looks half-empty until there are three certificates, so
// narrow the track to match however many there actually are.
const gridFor = (count) => {
  if (count === 1) return "mx-auto max-w-sm";
  if (count === 2) return "mx-auto max-w-3xl sm:grid-cols-2";
  return "sm:grid-cols-2 lg:grid-cols-3";
};

export const CertificatesSection = () => {
  return (
    <section id="certificates" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Certificates &"
          accent="Awards"
        />

        <div className={cn("grid gap-6", gridFor(certificates.length))}>
          {certificates.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 100}>
              <TiltCard className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40">
                {/* Certificate icon */}
                <div className="layer-3d mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 [--z:36px]">
                  <ScrollText className="h-6 w-6 text-primary" />
                </div>

                {/* Type badge */}
                <span className="layer-3d mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary [--z:26px]">
                  <Award size={13} aria-hidden="true" />
                  {cert.type}
                </span>

                {/* Title */}
                <h3 className="layer-3d mb-3 text-base font-semibold leading-snug [--z:20px]">
                  {cert.title}
                </h3>

                {/* Details */}
                <div className="layer-3d mb-4 space-y-1.5 text-sm text-muted-foreground [--z:12px]">
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
                  className="layer-3d mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground [--z:28px]"
                >
                  <ExternalLink size={15} />
                  View Certificate
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
