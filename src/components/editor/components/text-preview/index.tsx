import { useEffect, useState } from "react";
import { useAutoSync } from "../../hooks/use-auto-sync";
import { TextPreviewColumn } from "../text-preview-column";
import styles from "./text-preview.module.css";

export interface ScrollHeights {
  containerHeight: number;
  previewHeight: number;
}

interface ITextPreviewProps {
  source: string;
}

export const TextPreview = ({ source }: ITextPreviewProps): JSX.Element => {
  const [scrollHeights, setScrollHeights] = useState<ScrollHeights>({
    containerHeight: 0,
    previewHeight: 0,
  });
  const SCROLL_OVERLAP = 64;
  const INIT_SCROLL_COORD = 0;

  const [scrollToCords, setScrollToCoords] = useState([0]);

  useEffect(() => {
    const newScrollToCoords: number[] = [INIT_SCROLL_COORD];
    const getLastScrollCoord = () =>
      newScrollToCoords.at(-1) ?? INIT_SCROLL_COORD;

    while (getLastScrollCoord() < scrollHeights.previewHeight) {
      const nextScrollToCoord =
        getLastScrollCoord() + scrollHeights.containerHeight - SCROLL_OVERLAP;
      newScrollToCoords.push(nextScrollToCoord);
    }

    newScrollToCoords.length > 1 && newScrollToCoords.pop(); // last one will be more than previewHeight by nature of while loop
    setScrollToCoords(newScrollToCoords);
  }, [scrollHeights]);

  const autoSync = useAutoSync();
  useEffect(() => setScrollToCoords([0]), [autoSync]);

  return (
    <div className={styles.comp}>
      {scrollToCords.map((coord, idx) => (
        <TextPreviewColumn
          key={coord}
          source={source}
          isFirstCol={idx === 0}
          isLastCol={idx === scrollToCords.length - 1}
          setScrollHeights={setScrollHeights}
          scrollToCoord={coord}
        />
      ))}
    </div>
  );
};
