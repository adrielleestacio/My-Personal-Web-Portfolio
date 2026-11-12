import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { SocialLinks } from "./SocialLinks";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card px-4 py-10">
      <div className="container mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-semibold">{profile.fullName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} · Built with React, Vite and
            Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLinks compact size={17} />
          <a
            href="#hero"
            aria-label="Back to top"
            className="rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
          >
            <ArrowUp size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
