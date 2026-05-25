import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea component", () => {
  it("renders textarea with placeholder", () => {
    render(<Textarea placeholder="Опишіть тварину" />);

    expect(screen.getByPlaceholderText("Опишіть тварину")).toBeInTheDocument();
  });

  it("renders textarea with value", () => {
    render(<Textarea value="Добра і спокійна тварина" readOnly />);

    expect(screen.getByDisplayValue("Добра і спокійна тварина")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Textarea placeholder="Опис" className="custom-textarea" />);

    expect(screen.getByPlaceholderText("Опис")).toHaveClass("custom-textarea");
  });
});