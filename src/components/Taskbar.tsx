import "../styles/Taskbar.css";
import { useState, useEffect } from "react";

export interface TaskbarProps {
  windows: {
    id: number;
    title: string;
    isMinimized: boolean;
  }[];
  onFocusWindow: (id: number) => void;
  onRestoreWindow: (id: number) => void;
}

export default function Taskbar(props: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState("");

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

  return (
    <div className="taskbar">
      <div className="tabs">
        <button>start</button>

        {props.windows.map((win) => (
          <button
            key={win.id}
            className="tab-window"
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
