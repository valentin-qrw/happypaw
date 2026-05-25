import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge component", () => {
  it("renders badge text", () => {
    render(<Badge>Шукає дім</Badge>);

    expect(screen.getByText("Шукає дім")).toBeInTheDocument();
  });

  it("renders secondary variant", () => {
    render(<Badge variant="secondary">Уже прилаштовано</Badge>);

    expect(screen.getByText("Уже прилаштовано")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Badge className="custom-badge">Тест</Badge>);

    expect(screen.getByText("Тест")).toHaveClass("custom-badge");
  });
});