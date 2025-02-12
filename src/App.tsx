import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Desktop from "./components/Desktop";

export default function App() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Set a timer for 7 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 7000);

    // Clear the timer if the component unmounts before 5s
    return () => clearTimeout(timer);
  }, []);

  // If showLoading is true, render the loading screen
  if (showLoading) {
    return <Loading />;
  }

  // Otherwise, render the homepage
  return <Desktop />;
}
