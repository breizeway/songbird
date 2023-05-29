import lyrics from "@/assets/lyrics";
import classNames from "classnames";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "../../editor.module.css";

interface IDemoProps {
  source: string;
  setSource: Dispatch<SetStateAction<string>>;
}

let lastLyricsIdx = lyrics.length;

export const Demo = ({ source, setSource }: IDemoProps) => {
  const randomLyricsIdx = () => Math.floor(Math.random() * lyrics.length);
  const getNewLyrics = useCallback(() => {
    let newLyricsIdx = randomLyricsIdx();
    while (newLyricsIdx === lastLyricsIdx) newLyricsIdx = randomLyricsIdx();
    lastLyricsIdx = newLyricsIdx;
    return lyrics[newLyricsIdx];
  }, []);

  const saveDemoMode = (newDemoMode: boolean) =>
    (typeof localStorage !== "undefined" ? localStorage : null)?.setItem(
      "demoMode",
      `${newDemoMode}`
    );
  const [lsChecked, setLsChecked] = useState(false);
  const [demoMode, _setDemoMode] = useState(true);
  const toggleDemoMode = useCallback(() => {
    const newDemoMode = !demoMode;
    _setDemoMode(newDemoMode);
    saveDemoMode(newDemoMode);
    source === "" && setSource(getNewLyrics());
  }, [demoMode, source, setSource, getNewLyrics]);

  useEffect(() => {
    const savedDemoMode =
      ((typeof localStorage !== "undefined" ? localStorage : null)?.getItem(
        "demoMode"
      ) ?? "true") === "true";
    _setDemoMode(savedDemoMode);
    setLsChecked(true);
    saveDemoMode(savedDemoMode);
    savedDemoMode && setSource(getNewLyrics());
  }, [getNewLyrics, setSource]);

  useEffect(() => {
    const listenForDemoShortcut = (e: KeyboardEvent) => {
      if (e.shiftKey && e.ctrlKey && e.altKey && e.key === "Î") {
        e.preventDefault();
        toggleDemoMode();
      }
    };

    document.body.addEventListener("keydown", listenForDemoShortcut);
    return () =>
      document.body.removeEventListener("keydown", listenForDemoShortcut);
  }, [toggleDemoMode]);

  return (
    <>
      {lsChecked && demoMode && (
        <button
          className={classNames(styles.control, "ml-2")}
          onClick={() => setSource(getNewLyrics())}
        >
          Random Lyrics
        </button>
      )}
    </>
  );
};
