import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const html = readFileSync("index.html", "utf8");
const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));

const headersFor = (path) => {
  const rule = vercel.headers.find((r) => r.source === path);
  return Object.fromEntries(rule.headers.map((h) => [h.key, h.value]));
};

const headers = headersFor("/(.*)");
const csp = headers["Content-Security-Policy"];

/** Every inline <script> in the page, with the hash CSP will check it against. */
const inlineScripts = () => {
  const found = [];
  const pattern = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
  let match;

  while ((match = pattern.exec(html))) {
    // The HTML parser normalises CRLF to LF before the script's text exists,
    // and CSP hashes that normalised text. Files here are CRLF on disk, so
    // hashing them as-is produces a hash the browser never looks for.
    const body = match[2].replace(/\r\n?/g, "\n");
    found.push({
      label: match[1].trim() || "(inline script)",
      hash: `sha256-${createHash("sha256").update(body, "utf8").digest("base64")}`,
    });
  }

  return found;
};

describe("content security policy", () => {
  it("finds the inline scripts it is meant to cover", () => {
    expect(inlineScripts().length).toBeGreaterThan(0);
  });

  // Editing an inline script in index.html changes its hash. Without this the
  // page would keep building and only break in the browser, where the theme
  // script is blocked and the wrong theme flashes on every load.
  it.each(inlineScripts().map((s) => [s.label, s.hash]))(
    "allows %s",
    (_label, hash) => {
      expect(csp).toContain(`'${hash}'`);
    }
  );

  it("does not fall back to unsafe-inline for scripts", () => {
    const scriptSrc = csp.split(";").find((d) => d.trim().startsWith("script-src"));
    expect(scriptSrc).not.toContain("unsafe-inline");
    expect(scriptSrc).not.toContain("unsafe-eval");
  });

  it.each([
    ["default-src 'self'"],
    ["object-src 'none'"],
    ["frame-ancestors 'none'"],
    ["base-uri 'self'"],
  ])("keeps %s", (directive) => {
    expect(csp).toContain(directive);
  });

  it("allows the hosts the app actually talks to", () => {
    expect(csp).toContain("https://api.web3forms.com");
    expect(csp).toContain("https://cdn.simpleicons.org");
    expect(csp).toContain("https://fonts.gstatic.com");
  });
});

describe("security headers", () => {
  it.each([
    ["X-Content-Type-Options", "nosniff"],
    ["X-Frame-Options", "DENY"],
    ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ])("sends %s", (key, value) => {
    expect(headers[key]).toBe(value);
  });

  it("turns off the device APIs the site never uses", () => {
    for (const feature of ["camera", "microphone", "geolocation"]) {
      expect(headers["Permissions-Policy"]).toContain(`${feature}=()`);
    }
  });
});
