import "../styles/Desktop.css";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import { appData } from "../data/appData";
import { useState } from "react";

interface WindowData {
  id: number;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

export default function Desktop() {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [highestZ, setHighestZ] = useState<number>(1);
  const [windowCounter, setWindowCounter] = useState<number>(1);

  // 1. Function to calculate the center position
  const calculateCenterPosition = (
    windowWidth: number,
    windowHeight: number
  ) => {
    const centerX = window.innerWidth / 2 - windowWidth / 2;
    const centerY = window.innerHeight / 2 - windowHeight / 2;
    return { x: centerX, y: centerY };
  };

  // 1. When icon is double-clicked => open or focus a window
  const handleIconDoubleClick = (title: string) => {
    // Check if a window with that title is already open
    const exists = windows.find((w) => w.title === title);
    console.log(exists);

    if (exists) {
      // Bring existing window to the front
      handleFocusWindow(exists.id);
    } else {
      const app = appData.find((app) => app.title === title);
      if (!app) return; // If app is not found, do nothing

      const { x, y } = calculateCenterPosition(app.width, app.height); // Assuming window size of 300x200px

      // Create a new window
      const newWindow: WindowData = {
        id: windowCounter,
        title,
        x: x, // default position center
        y: y,
        width: app.width || 300,
        height: app.height || 200,
        zIndex: highestZ + 1,
        isMinimized: false,
      };
      setWindows((prev) => [...prev, newWindow]);
      setHighestZ((prevZ) => prevZ + 1);
      setWindowCounter((prevCounter) => prevCounter + 1);
    }
  };

  // 2. Close a window
  const handleCloseWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  // 3. Focus a window (bring to top)
  const handleFocusWindow = (id: number) => {
    setWindows((prev) => {
      return prev.map((w) => {
        if (w.id === id) {
          // increment global z, update the window's zIndex
          const newZ = highestZ + 1;
          setHighestZ(newZ);
          return { ...w, isMinimized: false, zIndex: newZ };
        }
        return w;
      });
    });
  };

  // 4. Drag/move a window => update its x, y
  const handleDragWindow = (id: number, x: number, y: number) => {
    setWindows((prev) => {
      return prev.map((w) => (w.id === id ? { ...w, x, y } : w));
    });
  };

  // Minimize window => set isMinimized = true
  const handleMinimizeWindow = (id: number) => {
    setWindows((prev) => {
      return prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w));
    });
  };

  return (
    <>
      <div className="polka-bg"></div>
      <div className="desktop">
        {appData.map((app) => (
          <DesktopIcon
            key={app.title}
            type={app.type}
            label={app.title}
            icon={app.icon}
            onDoubleClick={() => handleIconDoubleClick(app.title)}
          />
        ))}

        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            x={win.x}
            y={win.y}
            width={win.width}
            height={win.height}
            zIndex={win.zIndex}
            isMinimized={win.isMinimized}
            onClose={handleCloseWindow}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onDrag={handleDragWindow}
          />
        ))}
      </div>
      <Taskbar
        windows={windows}
        onFocusWindow={handleFocusWindow}
        onRestoreWindow={handleFocusWindow}
      />
    </>
  );
}
