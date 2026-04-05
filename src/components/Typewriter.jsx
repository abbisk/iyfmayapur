import { useState, useEffect } from "react";

export function useTypewriter(text, speed = 50, trigger = false) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!trigger) return setDisplayedText(""); // reset when trigger is false

    let index = 0;
    setDisplayedText(""); // reset before starting
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [trigger, text, speed]);

  return displayedText;
}
