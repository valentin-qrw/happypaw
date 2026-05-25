import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("Label component", () => {
  it("renders label text", () => {
    render(<Label htmlFor="pet-name">Ім’я тварини</Label>);

    expect(screen.getByText("Ім’я тварини")).toBeInTheDocument();
  });

  it("connects label with form field", () => {
    render(
      <>
        <Label htmlFor="pet-name">Ім’я тварини</Label>
        <input id="pet-name" />
      </>
    );

    expect(screen.getByLabelText("Ім’я тварини")).toBeInTheDocument();
  });
});