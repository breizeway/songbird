import { useEffect, useState } from "react";

const RESIZE_DEBOUNCE_INTERVAL = 150;
const RESIZE_DELAY = 450;

let resizeTimestamp = 0;

export const useWindowResize = () => {
  const [resized, _setResized] = useState<{} | null>(null);
  const [startCompletionDelay, setStartCompletionDelay] = useState<{} | null>(
    null
  );
  const [isResizing, setIsResizing] = useState(false);

  const onResizeCompleted = () => {
    setIsResizing(false);
    _setResized({});
  };

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      setIsResizing(true);

      if (e.timeStamp - resizeTimestamp > RESIZE_DEBOUNCE_INTERVAL) {
        resizeTimestamp = e.timeStamp;
        setStartCompletionDelay({});
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (startCompletionDelay) {
      const resizeCompletedTimeout = setTimeout(
        onResizeCompleted,
        RESIZE_DELAY
      );
      return () => clearTimeout(resizeCompletedTimeout);
    }
  }, [startCompletionDelay]);

  return { resized, isResizing };
};
