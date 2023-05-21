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
  const [scrollVals, setScrollVals] = useState<ScrollVals>({
    containerHeight: 0,
    contentHeight: 0,
  });
  const SCROLL_OVERLAP = 64;
  const INIT_SCROLL_COORD = 0;

  const [scrollToCords, setScrollToCoords] = useState([0]);

  useEffect(() => {
    if (Object.values(scrollVals).every((val) => val > 0)) {
      const newScrollToCoords: number[] = [INIT_SCROLL_COORD];
      while (
        (newScrollToCoords.at(-1) ?? INIT_SCROLL_COORD) <
        scrollVals.contentHeight
      ) {
        const scrollToCoord =
          (newScrollToCoords.at(-1) ?? INIT_SCROLL_COORD) +
          scrollVals.containerHeight -
          SCROLL_OVERLAP;
        newScrollToCoords.push(scrollToCoord);
      }

      newScrollToCoords.pop(); // last one will be more than contentHeight by nature of while loop
      setScrollToCoords(newScrollToCoords);
    }
  }, [scrollVals]);

  return (
    <div className={styles.comp}>
      {scrollToCords.map((coord, idx) => (
        <TextPreviewColumn
          key={idx}
          source={source}
          isFirstCol={idx === 0}
          isLastCol={idx === scrollToCords.length - 1}
          setScrollVals={setScrollVals}
          scrollToCoord={coord}
          lastScrollToCoord={scrollToCords.at(-1) ?? 0} // important for rerendering appropriately
        />
      ))}
    </div>
  );
};
