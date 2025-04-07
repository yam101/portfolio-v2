import "../styles/Desktop.css";
import "../styles/Scrollbar.css";
import bunnyGif from "../assets/bunny.gif";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import Loading from "./Loading";
import Overlay from "./Overlay";
import { appData } from "../data/appData";
import { useEffect, useState } from "react";

interface WindowData {
  id: number;
  title: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

type SystemMode = "normal" | "sleep" | "restart" | "shutdown";

export default function Desktop() {
  // Function to calculate the center position
  const calculateCenterPosition = (
    windowWidth: number,
    windowHeight: number
  ) => {
    const centerX = window.innerWidth / 2 - windowWidth / 2;
    const centerY = window.innerHeight / 2 - windowHeight / 2 - 40;
    return { x: centerX, y: centerY };
  };

  const [windows, setWindows] = useState<WindowData[]>(() => {
    const readme = appData.find((app) => app.title === "readme.txt");
    if (!readme) return [];
    const { x, y } = calculateCenterPosition(readme.width, readme.height);
    return [
      {
        id: 1,
        title: readme.title,
        type: readme.type,
        x,
        y,
        width: readme.width,
        height: readme.height,
        zIndex: 1,
        isMinimized: false,
      },
    ];
  });
  const [highestZ, setHighestZ] = useState<number>(2);
  const [windowCounter, setWindowCounter] = useState<number>(2);
  const [systemMode, setSystemMode] = useState<SystemMode>("normal");

  // When icon is double-clicked => open or focus a window
  const handleIconDoubleClick = (title: string) => {
    // Check if a window with that title is already open
    const exists = windows.find((w) => w.title === title);

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
        type: app.type,
        x: x, // default position center
        y: y,
        width: app.width,
        height: app.height,
        zIndex: highestZ + 1,
        isMinimized: false,
      };
      setWindows((prev) => [...prev, newWindow]);
      setHighestZ((prevZ) => prevZ + 1);
      setWindowCounter((prevCounter) => prevCounter + 1);
    }
  };

  // Close a window
  const handleCloseWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  // Focus a window (bring to top)
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

  // Drag/move a window => update its x, y
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

  // Functions to handle system states
  const handleRestart = () => {
    setSystemMode("restart");
  };

  const handleSleep = () => {
    setSystemMode("sleep");
  };

  const handleWake = () => {
    setSystemMode("normal");
  };

  const handleShutdown = () => {
    setSystemMode("shutdown");
  };

  // Render the sleep screen
  if (systemMode === "sleep") {
    return (
      <div className="sleep-screen" onClick={handleWake}>
        <img src={bunnyGif} />
        <p className="tooltip">(click to wake)</p>
      </div>
    );
  }

  // Render the loading screen
  if (systemMode === "restart") {
    window.location.reload();
  }

  if (systemMode === "shutdown") {
    return <div className="shutdown-screen"></div>;
  }

  return (
    <>
      <Overlay />
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
            type={win.type}
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
        onRestart={handleRestart}
        onSleep={handleSleep}
        onShutdown={handleShutdown}
      />
    </>
  );
}
