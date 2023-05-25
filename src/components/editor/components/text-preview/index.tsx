import { useEffect, useState } from "react";
import { TextPreviewColumn } from "../text-preview-column";
import styles from "./text-preview.module.css";

export interface ScrollHeights {
  containerHeight: number;
  previewHeight: number;
}

interface ITextPreviewProps {
  source: string;
  resync: {};
}

export const TextPreview = ({
  source,
  resync,
}: ITextPreviewProps): JSX.Element => {
  const [scrollHeights, setScrollHeights] = useState<ScrollHeights>({
    containerHeight: 0,
    previewHeight: 0,
  });
  const SCROLL_OVERLAP = 64;
  const INIT_SCROLL_COORD = 0;

  const [scrollToCords, setScrollToCoords] = useState([0]);

  useEffect(() => {
    if (Object.values(scrollHeights).every((val) => val > 0)) {
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
    }
  }, [scrollHeights, resync]);

  useEffect(() => setScrollToCoords([0]), [resync]);

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
