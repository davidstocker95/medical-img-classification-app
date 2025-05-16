import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ScoreBar from "../ratingComponents/ScoreBar";

/**
 * Basic test to ensure score buttons render and respond to clicks.
 */
test("renders all score buttons and selects the correct one", () => {
  const setScore = vi.fn();
  render(<ScoreBar currentScore={5} setScore={setScore} />);

  expect(screen.getByText("5")).toBeInTheDocument();

  const button = screen.getByText("7");
  fireEvent.click(button);

  expect(setScore).toHaveBeenCalledWith(7);
});
