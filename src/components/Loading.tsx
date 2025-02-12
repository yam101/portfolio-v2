import "../styles/Loading.css";
import { useState, useEffect } from "react";

export default function Loading() {
  const [ellipses, setEllipses] = useState("");

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setEllipses((prev) => {
        count++;
        if (count == 21) clearInterval(interval);
        return prev.length >= 3 ? "" : prev + ".";
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-bar-container">
      <div className="loading-text">LOADING{ellipses}</div>
    </div>
  );
}
