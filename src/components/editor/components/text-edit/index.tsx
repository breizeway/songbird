import styles from "./text-edit.module.css";

interface ITextEditProps {
  source: string;
  setSource: (text: string) => void;
}

export const TextEdit = ({
  source,
  setSource,
}: ITextEditProps): JSX.Element => {
  return (
    <textarea
      className={styles.comp}
      value={source}
      onChange={(e) => setSource(e.target.value)}
    />
  );
};
