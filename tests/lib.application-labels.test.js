import { describe, it, expect } from "vitest";
import {
  getExperienceLabel,
  getLivingSpaceLabel,
  getWorkScheduleLabel,
  getOtherPetsLabel,
} from "@/lib/application-labels";

describe("application label helpers", () => {
  it("returns experience labels and falls back to raw value", () => {
    expect(getExperienceLabel("first-time")).toBe("Без попереднього досвіду");
    expect(getExperienceLabel("unknown")).toBe("unknown");
  });

  it("returns living space labels", () => {
    expect(getLivingSpaceLabel("apartment")).toBe("Квартира");
    expect(getLivingSpaceLabel("house-large-yard")).toBe("Будинок з великим подвір’ям");
  });

  it("returns work schedule labels", () => {
    expect(getWorkScheduleLabel("work-from-home")).toBe("Робота з дому");
    expect(getWorkScheduleLabel("student")).toBe("Студент");
  });

  it("returns other pets labels", () => {
    expect(getOtherPetsLabel("dogs")).toBe("Є собаки");
    expect(getOtherPetsLabel("none")).toBe("Немає інших тварин");
  });
});
