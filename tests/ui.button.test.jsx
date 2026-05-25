import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button component", () => {
  it("renders with default styles and content", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies variant and size props", () => {
    render(<Button variant="secondary" size="lg">Done</Button>);

    const button = screen.getByRole("button", { name: /done/i });
    expect(button).toHaveAttribute("data-variant", "secondary");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it("renders a child anchor when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );

    expect(screen.getByRole("link", { name: /link/i })).toBeInTheDocument();
  });
});
