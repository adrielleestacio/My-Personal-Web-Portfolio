import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("drops the earlier of two conflicting Tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("keeps classes that do not conflict", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("ignores falsy values so conditionals can be inlined", () => {
    const isHidden = false;
    expect(cn("flex", isHidden && "hidden", undefined, "gap-2")).toBe("flex gap-2");
  });
});
