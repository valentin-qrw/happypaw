import { describe, it, expect } from "vitest";
import {
  getPetTypeLabel,
  getPetSizeLabel,
  getPetGenderLabel,
  getActivityLevelLabel,
  getAgeLabel,
} from "@/lib/pet-labels";

describe("pet label helpers", () => {
  it("returns correct type labels and falls back to raw value", () => {
    expect(getPetTypeLabel("dog")).toBe("Собака");
    expect(getPetTypeLabel("unknown")).toBe("unknown");
  });

  it("returns correct size labels and normalizes casing", () => {
    expect(getPetSizeLabel("small")).toBe("Малий");
    expect(getPetSizeLabel("MEDIUM")).toBe("Середній");
    expect(getPetSizeLabel("extra-large")).toBe("extra-large");
  });

  it("returns correct gender labels and fallback values", () => {
    expect(getPetGenderLabel("male")).toBe("Самець");
    expect(getPetGenderLabel("female")).toBe("Самка");
    expect(getPetGenderLabel("other")).toBe("other");
  });

  it("returns correct activity level labels", () => {
    expect(getActivityLevelLabel("low")).toBe("Низький");
    expect(getActivityLevelLabel("high")).toBe("Високий");
  });

  it("returns correct Ukrainian age suffixes", () => {
    expect(getAgeLabel(1)).toBe("рік");
    expect(getAgeLabel(2)).toBe("роки");
    expect(getAgeLabel(5)).toBe("років");
    expect(getAgeLabel(11)).toBe("років");
    expect(getAgeLabel(14)).toBe("років");
    expect(getAgeLabel(21)).toBe("рік");
  });
});
