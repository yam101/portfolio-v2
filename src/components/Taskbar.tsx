import "../styles/Taskbar.css";
import { useState, useEffect } from "react";

interface TaskbarProps {
  windows: {
    id: number;
    title: string;
    isMinimized: boolean;
  }[];
  onFocusWindow: (id: number) => void;
  onRestoreWindow: (id: number) => void;
  onRestart: () => void;
  onSleep: () => void;
  onShutdown: () => void;
}

export default function Taskbar(props: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const dayOfWeek = days[now.getDay()];
      const month = months[now.getMonth()];
      const day = now.getDate();

      setCurrentTime(`${dayOfWeek} ${month} ${day}  ${time}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  console.log(props.windows);
  return (
    <div className="taskbar">
      {startMenuOpen && (
        <div className="start-menu">
          <ul>
            <li onClick={props.onSleep}>Sleep</li>
            <li onClick={props.onRestart}>Restart</li>
            <li onClick={props.onShutdown}>Shut down</li>
          </ul>
        </div>
      )}
      <div className="tabs">
        <button
          className={`start-button ${startMenuOpen ? "active" : "minimized"}`}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          start
        </button>

        {props.windows.map((win) => (
          <button
            key={win.id}
            className={`${win.isMinimized ? "minimized" : "active"}`}
            onClick={() => {
              if (win.isMinimized) {
                props.onRestoreWindow(win.id);
              } else {
                props.onFocusWindow(win.id);
              }
            }}
          >
            {win.title}
          </button>
        ))}
      </div>

      <div className="clock">
        <p>{currentTime}</p>
      </div>
    </div>
  );
}
