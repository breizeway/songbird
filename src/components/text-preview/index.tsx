import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./text-preview.module.css";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

interface ITextPreviewProps {
  source: string;
}

export const TextPreview = ({ source }: ITextPreviewProps): JSX.Element => {
  const INIT_NUM_PANES = 3;
  const MIN_NUM_PANES = 1;

  const [numColumns, _setNumColumns] = useState(INIT_NUM_PANES);
  const incrementNumColumns = () => _setNumColumns(numColumns + 1);
  const decrementNumColumns = () =>
    numColumns > MIN_NUM_PANES && _setNumColumns(numColumns - 1);

  return (
    <table className={styles.main}>
      <tbody>
        <tr>
          {[...Array(numColumns)].map((idx) => (
            <td key={idx}>
              <MarkdownPreview source={source} />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
