import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { socials } from "@/data/profile";

const icons = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

export const SocialLinks = ({ className, size = 20, compact = false }) => (
  <ul className={cn("flex items-center gap-3", className)}>
    {socials.map((social) => {
      const Icon = icons[social.icon];

      return (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} profile`}
            title={social.name}
            data-cursor={`Follow me on ${social.name}`}
            className={cn(
              // Bare glyphs read as leftover text next to the cards around
              // them; a bordered disc makes them look like controls.
              "inline-flex items-center justify-center rounded-full border border-border",
              "bg-card text-foreground/70 transition-all duration-300",
              "hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary",
              "hover:shadow-[0_6px_18px_-8px_hsl(var(--primary)/0.7)]",
              compact ? "h-9 w-9" : "h-11 w-11"
            )}
          >
            <Icon size={size} aria-hidden="true" />
          </a>
        </li>
      );
    })}
  </ul>
);
