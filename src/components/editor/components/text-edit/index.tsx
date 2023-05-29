import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SourcePosition } from "../..";
import styles from "./text-edit.module.css";

let scrollTop = 0;

interface ITextEditProps {
  source: string;
  setSource: (text: string) => void;
  sourcePosition: SourcePosition;
  setSourcePosition: Dispatch<SetStateAction<SourcePosition>>;
}

export const TextEdit = ({
  source,
  setSource,
  sourcePosition,
  setSourcePosition,
}: ITextEditProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.focus();
      textArea.setSelectionRange(...sourcePosition.selectionRange);
      textArea.scrollTo({ top: sourcePosition.scrollTop });
    }
  }, [sourcePosition]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    return () => {
      if (textArea) {
        setSourcePosition({
          selectionRange: [textArea.selectionStart, textArea.selectionEnd],
          scrollTop,
        });
      }
    };
  }, [setSourcePosition]);

  useEffect(() => {
    const setScrollTop = (e: Event) => {
      if (e.currentTarget instanceof Element)
        scrollTop = e.currentTarget.scrollTop;
    };
    const textArea = textAreaRef.current;
    textArea?.addEventListener("scroll", setScrollTop);
    return () => textArea?.removeEventListener("scroll", setScrollTop);
  }, []);

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
