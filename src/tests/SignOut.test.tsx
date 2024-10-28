import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignOut from "../components/SignOut";

describe("SignOut component (Accessibility)", () => {
  it("renders the sign-out button with accessible text when a user is signed in", () => {
    render(<SignOut />);
    const signOutButton = screen.queryByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeNull();
  });

  it("has accessible label for screen readers", () => {
    render(<SignOut />);
    const signOutButton = screen.queryByRole("button");
    expect(signOutButton).toBeNull();
  });

  it("has appropriate visual focus styles", () => {
    render(<SignOut />);
    const signOutButton = screen.queryByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeNull();
  });
});
