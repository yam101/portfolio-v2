import { useCallback, useEffect, useState } from "react";
import "../styles/Window.css";

interface WindowProps {
  id: number;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  onFocus: (id: number) => void;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  onDrag: (id: number, x: number, y: number) => void;
}

export default function Window(props: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // When user presses mouse down on the title bar:
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only the left mouse button
      if (e.button !== 0) return;
      setIsDragging(true);

      // bring this window to front
      props.onFocus(props.id);

      // Calculate offset between window top-left and cursor
      const startX = e.clientX - props.x;
      const startY = e.clientY - props.y;
      setOffsetX(startX);
      setOffsetY(startY);
    },
    [props.id, props.onFocus, props.x, props.y]
  );

  // Mouse move: update window position if dragging
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      // If the mouse is outside the viewport, stop dragging
      if (
        e.clientX < 0 ||
        e.clientX > screenWidth ||
        e.clientY < 0 ||
        e.clientY > screenHeight
      ) {
        setIsDragging(false); // Stop dragging if mouse leaves the viewport
        return;
      }

      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      props.onDrag(props.id, newX, newY);
    },
    [
      isDragging,
      offsetX,
      offsetY,
      props.id,
      props.onDrag,
      screenWidth,
      screenHeight,
    ]
  );

  // Mouse up: stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mousemove event listener when dragging starts
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    // Cleanup the event listeners when dragging stops
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // If minimized, we either hide via display: none or skip rendering:
  if (props.isMinimized) {
    return null;
  }

  // 2. Focus the window when the entire window (not just title bar) is clicked
  const handleWindowClick = () => {
    props.onFocus(props.id);
  };

  // Prevent propagation of the click event on the minimize button to stop triggering window click
  const handleMinimize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent click from propagating to the parent container
    props.onMinimize(props.id);
  };

  return (
    <div
      className="desktop-window"
      style={{
        left: props.x,
        top: props.y,
        width: props.width,
        height: props.height,
        zIndex: props.zIndex,
      }}
      onClick={handleWindowClick}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <span className="window-title">{props.title}</span>
        <div className="window-bars">
          <hr />
          <hr />
        </div>
        <div className="window-controls">
          <button className="minimize" onClick={handleMinimize}>
            _
          </button>
          <button className="close" onClick={() => props.onClose(props.id)}>
            X
          </button>
        </div>
      </div>
      <div className="window-content">
        <p>blah blah blah</p>
      </div>
    </div>
  );
}
