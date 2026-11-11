import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { socials } from "@/data/profile";

const icons = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

export const SocialLinks = ({ className, size = 22 }) => (
  <ul className={cn("flex items-center gap-4", className)}>
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
            className="inline-flex text-foreground/70 transition-colors duration-300 hover:text-primary"
          >
            <Icon size={size} aria-hidden="true" />
          </a>
        </li>
      );
    })}
  </ul>
);
