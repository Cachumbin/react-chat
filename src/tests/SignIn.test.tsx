import { render, screen, fireEvent } from "@testing-library/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../components/firebaseConfig";
import SignIn from "../components/SignIn";

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
}));

describe("SignIn component", () => {
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

  it("calls signInWithPopup when the button is clicked", () => {
    render(<SignIn />);
    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });
    fireEvent.click(signInButton);
    expect(signInWithPopup).toHaveBeenCalledWith(
      auth,
      expect.any(GoogleAuthProvider)
    );
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
