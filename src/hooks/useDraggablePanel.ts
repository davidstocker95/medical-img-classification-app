import { useState, useRef, useCallback, useEffect } from 'react';
import type { XYPosition, BoxDimensions } from '../types';

export function useDraggablePanel(
  initialPosition: XYPosition,
  panelDimensions: BoxDimensions,
  borderMargin: number = 6
) {
  const [position, setPosition] = useState<XYPosition>(initialPosition);
  const isDragging = useRef<boolean>(false);
  const offset = useRef<XYPosition>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;

    const maxLeft = window.innerWidth - panelDimensions.width;
    const maxTop = window.innerHeight - panelDimensions.height;

    const newLeft = Math.max(0, Math.min(e.clientX - offset.current.x, maxLeft));
    const newTop = Math.max(0, Math.min(e.clientY - offset.current.y, maxTop));

    setPosition({ x: newLeft, y: newTop });
  }, [panelDimensions]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleWindowResize = useCallback(() => {
    const maxLeft = window.innerWidth - panelDimensions.width - borderMargin;
    const maxTop = window.innerHeight - panelDimensions.height - borderMargin;

    setPosition(prev => ({
      x: Math.max(0, Math.min(prev.x, maxLeft)),
      y: Math.max(0, Math.min(prev.y, maxTop)),
    }));
  }, [panelDimensions, borderMargin]);

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

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleMouseMove, handleMouseUp, handleWindowResize]);

  return {
    position,
    handleMouseDown,
    adjustPositionForSizeChange,
  };
}
