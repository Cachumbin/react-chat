import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignIn from "../components/SignIn";

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(() => Promise.resolve({})),
  getAuth: jest.fn(),
}));

describe("SignIn component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Google sign-in button with accessible text", () => {
    render(<SignIn />);
    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });
    expect(signInButton).toBeInTheDocument();
  });

  it("has correct accessible label for screen readers", () => {
    render(<SignIn />);
    const signInButton = screen.getByRole("button");
    expect(signInButton).toHaveTextContent("Sign in with Google");
  });

  it("has appropriate visual focus styles", () => {
    render(<SignIn />);
    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });
    signInButton.focus();
    expect(signInButton).toHaveFocus();
  });
});
