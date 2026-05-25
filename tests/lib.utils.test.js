import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("utility helpers", () => {
  it("combines classes and removes falsy values", () => {
    expect(cn("btn", false && "hidden", "rounded")).toBe("btn rounded");
  });

  it("merges Tailwind classes using tailwind-merge", () => {
    expect(cn("p-2", "p-4")).toContain("p-4");
  });
});
