import React, { useState, useEffect } from "react";

// Custom Hook
function useCurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return time;
}

// Component using the hook
function LiveClock() {
  const currentTime = useCurrentTime();

  return <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>;
}

export default LiveClock;
