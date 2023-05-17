import { useEffect, useRef } from "react";
import styles from "./pane.module.css";

interface IPaneProps {
  paneIdx: number;
  text: string;
  setText: (text: string) => void;
}

export const Pane = ({ text, setText }: IPaneProps): JSX.Element => {
  const ref = useRef(null);
  useEffect(() => {
    console.log(`:::REF::: `, ref);
  }, [ref.current]);

  return (
    <div className={styles.main}>
      <textarea
        className={styles.content}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={ref}
      />
    </div>
  );
};
