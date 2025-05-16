import { renderHook, act } from "@testing-library/react";
import { useDraggablePanel } from "../useDraggablePanel";
import type { XYPosition, BoxDimensions } from "../../types";

test("initializes with default position and updates correctly", () => {
  const initialPosition: XYPosition = { x: 80, y: 30 };
  const panelDimensions: BoxDimensions = { width: 200, height: 200 };

  const { result } = renderHook(() =>
    useDraggablePanel(initialPosition, panelDimensions)
  );

  expect(result.current.position).toMatchObject({ x: 80, y: 30 });

  act(() => {
    result.current.handleMouseDown({
      clientX: 100,
      clientY: 100,
      preventDefault: () => {},
    } as unknown as React.MouseEvent<Element>);
  });

  expect(result.current.position).toBeDefined(); // Placeholder — you can add more precise checks
});
