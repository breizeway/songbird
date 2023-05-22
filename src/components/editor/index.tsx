import { useCallback, useEffect, useState } from "react";
import { TextEdit } from "../text-edit";
import { TextPreview } from "../text-preview";
import styles from "./editor.module.css";
import { testMd } from "./test-md";

interface IEditorProps {}

export const Editor = ({}: IEditorProps): JSX.Element => {
  const [text, setText] = useState(testMd);
  const [resync, _setResync] = useState({});
  const triggerResync = () => _setResync({});

  enum TextMode {
    "edit",
    "preview",
  }
  const [textMode, _setTextMode] = useState<TextMode>(TextMode.edit);
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
        <button onClick={toggleTextMode}>Edit/Preview</button>
        {textMode === TextMode.preview && (
          <button onClick={triggerResync}>Sync</button>
        )}
      </div>
      {textMode === TextMode.edit ? (
        <TextEdit text={text} setText={setText} />
      ) : (
        <TextPreview source={text} resync={resync} />
      )}
    </div>
  );
};
