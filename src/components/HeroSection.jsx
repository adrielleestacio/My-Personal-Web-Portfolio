import { ArrowDown, Download, MapPin, Mail } from "lucide-react";
import { profile, highlights } from "@/data/profile";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24"
    >
      <div className="container z-10 mx-auto max-w-4xl text-center">
        <div className="space-y-6">
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

          <p className="animate-fade-in-delay-3 text-lg font-medium text-foreground/90 opacity-0 md:text-xl">
            {profile.role} · {profile.tagline}
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
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
            <a href={profile.resumeUrl} download className="ghost-button">
              <Download size={16} aria-hidden="true" />
              Download Résumé
            </a>
          </div>

          <dl className="animate-fade-in-delay-5 mx-auto grid max-w-2xl grid-cols-1 gap-4 pt-8 opacity-0 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm"
              >
                <dt className="text-sm font-semibold text-primary">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {item.detail}
                </dd>
              </div>
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
