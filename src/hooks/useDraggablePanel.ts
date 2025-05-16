import { useState, useRef, useCallback, useEffect } from "react";
import type { XYPosition, BoxDimensions } from "../types";

/**
 * useDraggablePanel
 *
 * A reusable hook that enables a UI panel to be draggable within the browser window.
 * It maintains position state and clamps movement within visible bounds,
 * also adjusting automatically on window resize.
 *
 * @param initialPosition - Initial position of the panel ({ x, y }) in screen coordinates.
 * @param panelDimensions - Width and height of the draggable panel (used for clamping to window size).
 * @param borderMargin - Optional minimum distance (in px) to keep panel away from viewport edges (default: 6).
 *
 * @returns {
 *   position: XYPosition — The current top-left position of the panel.
 *   handleMouseDown: function — Attach to onMouseDown of the panel to initiate dragging.
 *   adjustPositionForSizeChange: function — Use if the panel content shrinks/grows and you want to realign.
 * }
 *
 * Notes:
 * - Clamps the panel to remain fully visible within the viewport.
 * - Automatically updates position on window resize.
 * - Uses native window mouse events for smooth dragging experience.
 */
export function useDraggablePanel(
  initialPosition: XYPosition,
  panelDimensions: BoxDimensions,
  borderMargin: number = 6
) {
  const [position, setPosition] = useState<XYPosition>(initialPosition);
  const isDragging = useRef(false);

  // Stores the offset between the mouse click and panel's top-left corner
  const offset = useRef<XYPosition>({ x: 0, y: 0 });

  // Triggered onMouseDown to begin dragging — stores initial offset
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position]
  );

  // Global mousemove handler: moves panel while mouse is dragging
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;

      const maxLeft = window.innerWidth - panelDimensions.width;
      const maxTop = window.innerHeight - panelDimensions.height;

      const newLeft = Math.max(0, Math.min(e.clientX - offset.current.x, maxLeft));
      const newTop = Math.max(0, Math.min(e.clientY - offset.current.y, maxTop));

      setPosition({ x: newLeft, y: newTop });
    },
    [panelDimensions]
  );

  // Ends drag state on mouseup
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Clamps the panel back into view when the window is resized
  const handleWindowResize = useCallback(() => {
    const maxLeft = window.innerWidth - panelDimensions.width - borderMargin;
    const maxTop = window.innerHeight - panelDimensions.height - borderMargin;

    setPosition(prev => ({
      x: Math.max(0, Math.min(prev.x, maxLeft)),
      y: Math.max(0, Math.min(prev.y, maxTop)),
    }));
  }, [panelDimensions, borderMargin]);

  /**
   * Call this when the panel's content changes size (e.g., shrink on layout change).
   * Shifts position to accommodate new dimensions.
   */
  const adjustPositionForSizeChange = useCallback(
    (from: BoxDimensions, to: BoxDimensions) => {
      const deltaX = from.width - to.width;
      const deltaY = from.height - to.height;

      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    },
    []
  );

  // Register and clean up mouse and resize event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleMouseMove, handleMouseUp, handleWindowResize]);

  return {
    position,
    handleMouseDown,
    adjustPositionForSizeChange,
  };
}
