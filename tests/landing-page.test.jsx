import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "@/components/landing/landing-page";

describe("LandingPage component", () => {
  it("renders the hero heading and primary calls to action", () => {
    render(<LandingPage />);

    expect(screen.getByText(/Знайдіть свого ідеального/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Почати прилаштування/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Додати тварину/i })).toBeInTheDocument();
  });

  it("renders feature cards with titles", () => {
    render(<LandingPage />);

    expect(screen.getByText(/Розумний підбір/i)).toBeInTheDocument();
    expect(screen.getByText(/Пряме спілкування/i)).toBeInTheDocument();
    expect(screen.getByText(/Безпечно і надійно/i)).toBeInTheDocument();
  });
});
