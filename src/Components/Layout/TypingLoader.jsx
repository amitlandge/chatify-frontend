import { useState, useEffect } from "react";

const TypingLoader = (prop) => {
  const { text = "Loading", speed = 200 } = prop;
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + ".";
        } else {
          return "";
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div>
      {text}
      {dots}
    </div>
  );
};

export default TypingLoader;
