import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer", () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});
