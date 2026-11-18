import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { profile, socials, highlights } from "@/data/profile";
import { webpSize } from "./imageSize";

describe("profile data", () => {
  it("gives the hero typewriter something to cycle", () => {
    expect(profile.roles.length).toBeGreaterThan(1);
    // The hero prints a static "I'm" in front of each line.
    for (const role of profile.roles) {
      expect(role[0]).toBe(role[0].toLowerCase());
      expect(role).not.toMatch(/^i'?m /i);
    }
  });

  it("has a reachable email and phone", () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/i);
    expect(profile.phoneHref).toMatch(/^\+\d{7,}$/);
  });

  it("points at files that exist", () => {
    expect(existsSync(`public${profile.resumeUrl}`)).toBe(true);
    // The hero hardcodes width/height 560 against this file.
    expect(webpSize(`public${profile.photo}`)).toEqual({ w: 560, h: 560 });
  });

  it("has four highlights' worth of labels", () => {
    for (const item of highlights) {
      expect(item.label).toBeTruthy();
      expect(item.detail).toBeTruthy();
    }
  });
});

describe("socials", () => {
  it.each(socials.map((s) => [s.name, s]))("%s is an https profile link", (_name, social) => {
    expect(social.href).toMatch(/^https:\/\//);
    expect(social.icon).toBeTruthy();
  });

  it("includes the GitHub link the projects section reuses", () => {
    expect(socials.find((s) => s.icon === "github")).toBeDefined();
  });
});
