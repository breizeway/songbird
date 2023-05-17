import { useCallback, useEffect, useState } from "react";
import { TextEdit } from "../text-edit";
import { TextPreview } from "../text-preview";
import styles from "./editor.module.css";

interface IEditorProps {}

export const Editor = ({}: IEditorProps): JSX.Element => {
  const [text, setText] = useState("");

  enum TextMode {
    "edit",
    "preview",
  }
  const [textMode, _setTextMode] = useState<TextMode>(TextMode.edit);
  const switchTextMode = useCallback(() => {
    _setTextMode(textMode === TextMode.edit ? TextMode.preview : TextMode.edit);
  }, [TextMode, textMode]);

  useEffect(() => {
    const listenForShortcuts = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "e") {
        e.preventDefault();
        switchTextMode();
      }
    };

    document.body.addEventListener("keydown", listenForShortcuts);
    return () =>
      document.body.removeEventListener("keydown", listenForShortcuts);
  }, [switchTextMode]);
  return (
    <>
      <div className={styles.controls}>
        <button onClick={switchTextMode}>{"Edit/Preview"}</button>
      </div>
      {textMode === TextMode.edit ? (
        <TextEdit text={text} setText={setText} />
      ) : (
        <TextPreview source={text} />
      )}
    </>
  );
};
