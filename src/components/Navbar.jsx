import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { profile } from "@/data/profile";

const navItems = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

const sectionIds = navItems.map((item) => item.id);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    // window.scrollY — the original used window.screenY, which is always 0
    // on a scroll event, so the condensed navbar never appeared.
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 py-3 backdrop-blur-md"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between gap-4">
        <a
          href="#hero"
          className="flex items-center gap-2 text-lg font-bold"
          onClick={() => setIsMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
          >
            AE
          </span>
          <span className="hidden sm:inline">
            <span className="text-glow">{profile.firstName}</span>{" "}
            <span className="text-muted-foreground font-medium">
              {profile.lastName}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors duration-300",
                activeId === item.id
                  ? "bg-secondary font-medium text-primary"
                  : "text-foreground/70 hover:text-primary"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <a
            href={profile.resumeUrl}
            download
            className="hidden rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary lg:inline-block"
          >
            Résumé
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="z-50 p-2 text-foreground md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav sheet */}
        <div
          id="mobile-menu"
          hidden={!isMenuOpen}
          className={cn(
            "fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md",
            "transition-opacity duration-300 md:hidden",
            isMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          )}
        >
          <div className="flex flex-col items-center gap-7 text-xl">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "transition-colors duration-300",
                  activeId === item.id
                    ? "font-medium text-primary"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
              </a>
            ))}

            <a
              href={profile.resumeUrl}
              download
              onClick={() => setIsMenuOpen(false)}
              className="ghost-button mt-2 text-base"
            >
              Download Résumé
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
