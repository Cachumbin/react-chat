import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import MessageForm from "../components/MessageForm";
import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);

describe("MessageForm Accessibility Tests", () => {
  const mockSendMessage = jest.fn();

  test("renders input fields with appropriate labels", () => {
    render(<MessageForm onSendMessage={mockSendMessage} />);

    const fileInput = screen.getByLabelText(/attachment/i);
    const textInput = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole("button");

    expect(fileInput).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  test("button should be disabled when input is empty", () => {
    render(<MessageForm onSendMessage={mockSendMessage} />);
    const sendButton = screen.getByRole("button");

    expect(sendButton).toBeDisabled();
  });

  test("button should be enabled when message or file is provided", () => {
    render(<MessageForm onSendMessage={mockSendMessage} />);
    const textInput = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole("button");

    fireEvent.change(textInput, { target: { value: "Hello!" } });
    expect(sendButton).toBeEnabled();
  });

  test("file input should be accessible by label", () => {
    render(<MessageForm onSendMessage={mockSendMessage} />);
    const fileInput = screen.getByLabelText(/attachment/i);
    expect(fileInput).toBeInTheDocument();
  });

  test("component should have no accessibility violations", async () => {
    const { container } = render(
      <MessageForm onSendMessage={mockSendMessage} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
