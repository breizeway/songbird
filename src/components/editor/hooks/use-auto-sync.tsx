import { useEffect, useState } from "react";

let autoSyncReady = false;

let resizeTimestamp = 0;
let resizeJustStarted = true;

export const useAutoSync = () => {
  const [autoSync, _setAutoSync] = useState<{} | null>(null);

  const triggerAutoSync = () => {
    if (autoSyncReady) _setAutoSync({});
    autoSyncReady = true;
  };

  const [needsSync, setNeedsSync] = useState({});

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if (e.timeStamp - resizeTimestamp > 250) {
        resizeTimestamp = e.timeStamp;

        if (resizeJustStarted) {
          resizeJustStarted = false;
        } else {
          setNeedsSync({});
        }
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const resyncTimeout = setTimeout(triggerAutoSync, 750);
    return () => clearTimeout(resyncTimeout);
  }, [needsSync]);

  return autoSync;
};
