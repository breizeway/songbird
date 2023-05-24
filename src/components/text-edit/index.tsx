import classNames from "classnames";
import styles from "./text-edit.module.css";

interface ITextEditProps {
  text: string;
  setText: (text: string) => void;
}

export const TextEdit = ({ text, setText }: ITextEditProps): JSX.Element => {
  return (
    <textarea
      className={classNames(
        styles.comp,
        "bg-base-back-light",
        "dark:bg-base-back-dark"
      )}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
