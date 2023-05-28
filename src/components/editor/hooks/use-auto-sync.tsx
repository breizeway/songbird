import { useEffect, useState } from "react";

let resizeTimestamp = 0;
let lastWidth = Infinity;
let lastHeight = Infinity;

export const useAutoSync = () => {
  const [autoSync, _setAutoSync] = useState<{} | null>(null);
  const [needsSync, setNeedsSync] = useState<{} | null>(null);
  const triggerAutoSync = () => _setAutoSync({});

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      const newWidth = (e.target as Window).innerWidth;
      const newHeight = (e.target as Window).innerHeight;

      if (
        e.timeStamp - resizeTimestamp > 250 &&
        (newWidth > lastWidth || newHeight > lastHeight)
      ) {
        resizeTimestamp = e.timeStamp;
        setNeedsSync({});
      }

      lastWidth = newWidth;
      lastHeight = newHeight;
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (needsSync) {
      const resyncTimeout = setTimeout(triggerAutoSync, 750);
      return () => clearTimeout(resyncTimeout);
    }
  }, [needsSync]);

  return autoSync;
};
