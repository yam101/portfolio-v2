import { useState, useEffect } from "react";
import "../styles/Desktop.css";

export default function Overlay() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    checkSize(); // initial check
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (!isSmallScreen) return null;

  return (
    <div className="overlay">
      for the best experience, please use a larger screen
    </div>
  );
}
