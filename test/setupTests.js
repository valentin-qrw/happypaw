import React from "react";
import "@testing-library/jest-dom";

vi.mock("next/link", () => ({
  default: ({ children }) => children,
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }) => React.createElement("img", { alt, src, ...props }),
}));
