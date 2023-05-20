import { useEffect, useState } from "react";
import { TextPreviewColumn } from "../text-preview-column";
import styles from "./text-preview.module.css";

export interface ScrollVals {
  containerHeight: number;
  contentHeight: number;
}

interface ITextPreviewProps {
  source: string;
}

export const TextPreview = ({ source }: ITextPreviewProps): JSX.Element => {
  const INIT_NUM_PANES = 1;
  const MIN_NUM_PANES = 1;

  const [numColumns, _setNumColumns] = useState(INIT_NUM_PANES);
  const setNumColumns = (newNumColumns: number) => {
    _setNumColumns(
      newNumColumns < MIN_NUM_PANES ? MIN_NUM_PANES : newNumColumns
    );
  };

  const [scrollVals, setScrollVals] = useState<ScrollVals>({
    containerHeight: 0,
    contentHeight: 0,
  });
  useEffect(() => {
    if (Object.values(scrollVals).some((val) => val > 0)) {
      const newNumColumns = Math.ceil(
        scrollVals.contentHeight / scrollVals.containerHeight
      );
      setNumColumns(newNumColumns);
    }
  }, [scrollVals]);

  return (
    <div className={styles.comp}>
      {[...Array(numColumns)].map((_, idx) => (
        <TextPreviewColumn
          key={idx}
          source={source}
          columnIndex={idx}
          numColumns={numColumns}
          scrollVals={scrollVals}
          setScrollVals={setScrollVals}
        />
      ))}
    </div>
  );
};
