import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ChatMessage from "../components/ChatMessage";
import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);

jest.mock("../components/firebaseConfig", () => ({
  auth: {
    currentUser: { uid: "current-user-uid" },
  },
  firestore: jest.fn(),
  storage: jest.fn(),
}));

describe("ChatMessage Accessibility Tests", () => {
  const sampleMessage = {
    text: "Hello!",
    uid: "some-other-user-uid",
    displayName: "John Doe",
    photoURL: "https://example.com/photo.jpg",
    fileURL: "https://example.com/file.pdf",
    fileName: "file.pdf",
    fileSize: 1024,
  };

  test("renders text message with appropriate labels", () => {
    render(<ChatMessage message={sampleMessage} />);

    const textContent = screen.getByText(/hello!/i);
    const displayName = screen.getByText(/john doe/i);
    const avatar = screen.getByAltText(/user avatar/i);
    const fileLink = screen.getByRole("link", { name: /file\.pdf/i });

    expect(textContent).toBeInTheDocument();
    expect(displayName).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(fileLink).toBeInTheDocument();
  });

  test("applies styling based on current user", () => {
    const userMessage = { ...sampleMessage, uid: "current-user-uid" };
    const { rerender } = render(<ChatMessage message={userMessage} />);

    let messageBox = screen.getByText(/hello!/i).parentElement;
    expect(messageBox).toHaveClass("bg-pink-500");

    const otherMessage = { ...sampleMessage, uid: "other-user-uid" };
    rerender(<ChatMessage message={otherMessage} />);
    messageBox = screen.getByText(/hello!/i).parentElement;
    expect(messageBox).toHaveClass("bg-yellow-300");
  });

  test("renders media elements based on file type", () => {
    const imageMessage = {
      ...sampleMessage,
      fileURL: "https://example.com/photo.jpg",
      fileName: "photo.jpg",
    };
    const { rerender } = render(<ChatMessage message={imageMessage} />);
    let image = screen.getByAltText(/uploaded file/i);
    expect(image).toBeInTheDocument();

    const audioMessage = {
      ...sampleMessage,
      fileURL: "https://example.com/audio.mp3",
      fileName: "audio.mp3",
    };
    rerender(<ChatMessage message={audioMessage} />);
    const audio = screen.getByTitle("audio");
    expect(audio).toBeInTheDocument();
  });

  test("component should have no accessibility violations", async () => {
    const { container } = render(<ChatMessage message={sampleMessage} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
