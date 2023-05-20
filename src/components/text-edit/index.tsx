import styles from "./text-edit.module.css";

interface ITextEditProps {
  text: string;
  setText: (text: string) => void;
}

export const TextEdit = ({ text, setText }: ITextEditProps): JSX.Element => {
  return (
    <textarea
      className={styles.comp}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
