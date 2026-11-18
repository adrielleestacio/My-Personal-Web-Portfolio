import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { webpSize } from "./imageSize";

const publicPath = (url) => `public${url}`;

describe("projects data", () => {
  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("marks exactly one project as featured", () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(1);
  });

  it.each(projects.map((p) => [p.id, p]))(
    "%s has the fields the cards read",
    (_id, project) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
    }
  );

  // The cards reserve space from imageSize before the image loads. If the two
  // ever drift the section shifts as it loads, which is the layout shift that
  // c204c42 fixed — so the numbers are checked against the real files.
  it.each(projects.filter((p) => p.image).map((p) => [p.id, p]))(
    "%s declares the real size of its screenshot",
    (_id, project) => {
      const path = publicPath(project.image);
      expect(existsSync(path), `${path} is missing`).toBe(true);
      expect(webpSize(path)).toEqual(project.imageSize);
    }
  );

  it.each(projects.map((p) => [p.id, p]))(
    "%s links out over https",
    (_id, project) => {
      for (const url of [project.demoUrl, project.githubUrl]) {
        if (url) expect(url).toMatch(/^https:\/\//);
      }
    }
  );

  // The case study is an in-app route, not an outbound link: an absolute URL
  // here would send a visitor out of the SPA and back in again.
  it.each(projects.filter((p) => p.caseStudyUrl).map((p) => [p.id, p]))(
    "%s points its case study at an in-app route",
    (_id, project) => {
      expect(project.caseStudyUrl).toMatch(/^\/[a-z0-9/-]+$/);
    }
  );

  // A card with no live link leaves a gap unless it says why.
  it.each(projects.map((p) => [p.id, p]))(
    "%s explains a missing demo",
    (_id, project) => {
      if (!project.demoUrl) expect(project.demoNote).toBeTruthy();
    }
  );
});
