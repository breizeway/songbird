import { useEffect, useRef, useState } from "react";
import { ScrollVals } from "../text-preview";
import { TextPreviewMd } from "../text-preview-md";
import styles from "./text-preview-column.module.css";

interface ITextPreviewColumnProps {
  source: string;
  isFirstCol: boolean;
  isLastCol: boolean;
  setScrollVals: (scrollVals: ScrollVals) => void;
  scrollToCoord: number;
  resync: {};
  lastScrollToCoord: number;
}

export const TextPreviewColumn = ({
  source,
  isFirstCol,
  isLastCol,
  setScrollVals,
  scrollToCoord,
  resync,
  lastScrollToCoord,
}: ITextPreviewColumnProps): JSX.Element => {
  const [previewRendered, setPreviewRendered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // calculate scroll height values and sent back to parent comp
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const previewContainer = previewContainerRef.current;
    if (
      isFirstCol &&
      previewRendered &&
      !!scrollContainer &&
      !!previewContainer
    ) {
      setScrollVals({
        containerHeight: scrollContainer.offsetHeight,
        contentHeight: previewContainer.offsetHeight,
      });
    }
  }, [isFirstCol, previewRendered, setScrollVals, lastScrollToCoord, resync]);

  // scroll to the correct place after additional columns are added
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (previewRendered && !!scrollContainer) {
      scrollContainer.scrollTo({ top: scrollToCoord });
    }
  }, [isFirstCol, previewRendered, scrollToCoord, lastScrollToCoord, resync]);

  // whitespace to add to the last column so it cans scroll down far enough
  const Whitespace = () => {
    const scrollContainer = scrollContainerRef.current;
    const previewContainer = previewContainerRef.current;

    if (isLastCol && !!scrollContainer && !!previewContainer) {
      const percentWhitespaceNeeded =
        (1 -
          (previewContainer.offsetHeight - scrollToCoord) /
            scrollContainer.offsetHeight) *
        100;
      return <div style={{ height: `${percentWhitespaceNeeded}%` }} />;
    }
    return null;
  };

  return (
    <div className={styles.comp}>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <div ref={previewContainerRef}>
          <TextPreviewMd
            source={source}
            setPreviewRendered={setPreviewRendered}
          />
        </div>
        <Whitespace />
      </div>
    </div>
  );
};
