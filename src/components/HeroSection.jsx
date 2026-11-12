import { ArrowDown, Download, MapPin, Mail } from "lucide-react";
import { profile, highlights } from "@/data/profile";
import { Typewriter } from "./Typewriter";
import { Magnetic } from "./Magnetic";
import { TiltCard } from "./TiltCard";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24"
    >
      <div className="container z-10 mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <div className="animate-fade-in flex justify-center opacity-0">
            <div
              data-cursor="Hi, I'm Adrielle 👋"
              className="relative rounded-full"
            >
              {/* A rim light orbiting slowly behind the portrait. */}
              <span aria-hidden="true" className="orbit-ring -inset-3" />

              <div className="rounded-full bg-linear-to-br from-primary to-primary/25 p-1 shadow-[0_0_35px_hsl(var(--primary)/0.3)]">
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.fullName}`}
                  width="560"
                  height="560"
                  fetchPriority="high"
                  className="h-28 w-28 rounded-full object-cover md:h-36 md:w-36"
                />
              </div>
            </div>
          </div>

          <p className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground opacity-0 backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {profile.availability}
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            <span className="animate-fade-in opacity-0">Hi, I&apos;m </span>
            <span className="animate-fade-in-delay-1 text-primary opacity-0">
              {profile.firstName}
            </span>
            <span className="animate-fade-in-delay-2 text-gradient ml-2 opacity-0">
              {profile.lastName}
            </span>
          </h1>

          <p className="animate-fade-in-delay-3 min-h-[2em] text-lg font-medium opacity-0 md:text-xl">
            <Typewriter
              words={profile.roles}
              className="font-semibold text-primary"
            />
          </p>

          <p className="animate-fade-in-delay-3 mx-auto max-w-2xl text-base text-muted-foreground opacity-0 md:text-lg">
            {profile.headline}
          </p>

          <div className="animate-fade-in-delay-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground opacity-0">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              {profile.email}
            </a>
          </div>

          <div className="animate-fade-in-delay-4 flex flex-col items-center justify-center gap-4 pt-2 opacity-0 sm:flex-row">
            <Magnetic>
              <a
                href="#projects"
                data-cursor="See what I've built"
                className="cosmic-button"
              >
                View My Work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeUrl}
                download
                data-cursor="Download my CV"
                className="ghost-button"
              >
                <Download size={16} aria-hidden="true" />
                Download Résumé
              </a>
            </Magnetic>
          </div>

          <dl className="animate-fade-in-delay-5 mx-auto grid max-w-2xl grid-cols-1 gap-4 pt-8 opacity-0 sm:grid-cols-3">
            {highlights.map((item) => (
              <TiltCard
                key={item.label}
                max={10}
                className="h-full rounded-xl border border-border bg-card/60 p-4"
              >
                {/* The blur gets its own layer: backdrop-filter on the card
                    face itself would flatten the 3D group and kill the depth. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[inherit] backdrop-blur-sm"
                />
                <dt className="layer-3d text-sm font-semibold text-primary [--z:26px]">
                  {item.label}
                </dt>
                <dd className="layer-3d mt-1 text-sm text-muted-foreground [--z:14px]">
                  {item.detail}
                </dd>
              </TiltCard>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the about section"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="mb-2 text-sm">Scroll</span>
        <ArrowDown className="h-5 w-5 animate-bounce text-primary" />
      </a>
    </section>
  );
};
