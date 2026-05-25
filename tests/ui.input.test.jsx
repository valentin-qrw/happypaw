import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input component", () => {
  it("renders an input element with the correct type", () => {
    render(<Input type="email" placeholder="Email" />);

    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("type", "email");
  });
});
