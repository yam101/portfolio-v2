import { useEffect, useState } from "react";
import ChromeDino from "react-chrome-dino";
import "../styles/DinoGame.css";

export default function DinoGame() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure component is properly mounted before rendering ChromeDino
    setIsMounted(true);

    return () => {
      // Cleanup when component unmounts
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="dino-game-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#666",
          }}
        >
          Loading game...
        </div>
      </div>
    );
  }

  return (
    <div className="dino-game-container">
      <ChromeDino key="chrome-dino-game" />
    </div>
  );
}
