import { useCallback, useEffect, useState } from "react";
import { TextEdit } from "./components/text-edit";
import { TextPreview } from "./components/text-preview";
import styles from "./editor.module.css";
import { testMd } from "./test-md";
import { testSong } from "./test-song";

export const Editor = ({}): JSX.Element => {
  const [text, setText] = useState(testSong);
  const [sync, _setSync] = useState({});
  const triggerSync = () => {
    _setSync({});
  };

  enum TextMode {
    "edit",
    "preview",
  }
  const [textMode, _setTextMode] = useState<TextMode>(
    text ? TextMode.preview : TextMode.edit
  );
  const toggleTextMode = useCallback(() => {
    _setTextMode(textMode === TextMode.edit ? TextMode.preview : TextMode.edit);
  }, [TextMode, textMode]);

  useEffect(() => {
    const listenForShortcuts = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "e") {
        e.preventDefault();
        toggleTextMode();
      }
    };

    document.body.addEventListener("keydown", listenForShortcuts);
    return () =>
      document.body.removeEventListener("keydown", listenForShortcuts);
  }, [toggleTextMode]);

  return (
    <div className={styles.comp}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <button onClick={toggleTextMode}>Edit/Preview</button>
          {textMode === TextMode.preview && (
            <button onClick={triggerSync}>Sync</button>
          )}
        </div>
        <div className={styles.controlGroup}>
          <button
            onClick={() => {
              setText(testSong);
              triggerSync();
            }}
          >
            Test Lyrics
          </button>
          <button
            onClick={() => {
              setText(testMd);
              triggerSync();
            }}
          >
            Test Markdown
          </button>
        </div>
      </div>
      {textMode === TextMode.edit ? (
        <TextEdit text={text} setText={setText} />
      ) : (
        <TextPreview source={text} sync={sync} />
      )}
    </div>
  );
};
