import { useEffect, useState } from "react";

let resizeTimestamp = 0;

export const useAutoSync = () => {
  const [autoSync, _setAutoSync] = useState<{} | null>(null);
  const [needsSync, setNeedsSync] = useState<{} | null>(null);
  const triggerAutoSync = () => _setAutoSync({});

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if (e.timeStamp - resizeTimestamp > 250) {
        resizeTimestamp = e.timeStamp;
        setNeedsSync({});
      }
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
