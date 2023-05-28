import { useEffect, useRef } from "react";
import styles from "./text-edit.module.css";

interface ITextEditProps {
  source: string;
  setSource: (text: string) => void;
  sourceSelection: [number, number];
  setSourceSelection: Function;
}

let selectionStart = 0;

export const TextEdit = ({
  source,
  setSource,
  sourceSelection,
  setSourceSelection,
}: ITextEditProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.focus();
      textArea.setSelectionRange(...sourceSelection);
    }
  }, [sourceSelection]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    return () =>
      setSourceSelection([
        textArea?.selectionStart ?? 0,
        textArea?.selectionEnd ?? 0,
      ]);
  }, [setSourceSelection]);

  return (
    <textarea
      className={styles.comp}
      value={source}
      onChange={(e) => setSource(e.target.value)}
      placeholder="Enter text here..."
      ref={textAreaRef}
    />
  );
};
