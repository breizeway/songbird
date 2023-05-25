import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { ScrollHeights } from "../text-preview";
import { TextPreviewMd } from "../text-preview-md";
import styles from "./text-preview-column.module.css";

interface ITextPreviewColumnProps {
  source: string;
  isFirstCol: boolean;
  isLastCol: boolean;
  setScrollHeights: Dispatch<SetStateAction<ScrollHeights>>;
  scrollToCoord: number;
}

let lastScrollContainerHeight = 0;
let lastPreviewContainerHeight = 0;

export const TextPreviewColumn = ({
  source,
  isFirstCol,
  isLastCol,
  setScrollHeights,
  scrollToCoord,
}: ITextPreviewColumnProps): JSX.Element => {
  const [previewRendered, setPreviewRendered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainerObserver = new ResizeObserver((entries) => {
      const height = !!entries[0] ? entries[0].contentRect.height : 0;
      if (height !== lastScrollContainerHeight) {
        lastScrollContainerHeight = height;
        console.log(`:::s-HEIGHT::: `, height);
        setScrollHeights((prevScrollHeights) => ({
          ...prevScrollHeights,
          containerHeight: height,
        }));
      }
    });
    const previewContainerObserver = new ResizeObserver((entries) => {
      const height = !!entries[0] ? entries[0].contentRect.height : 0;
      if (height !== lastPreviewContainerHeight) {
        lastPreviewContainerHeight = height;
        console.log(`:::p-HEIGHT::: `, height);
        setScrollHeights((prevScrollHeights) => ({
          ...prevScrollHeights,
          previewHeight: height,
        }));
      }
    });

    const scrollContainer = scrollContainerRef.current;
    const previewContainer = previewContainerRef.current;
    if (
      isFirstCol &&
      // previewRendered &&
      !!scrollContainer &&
      !!previewContainer
    ) {
      scrollContainerObserver.observe(scrollContainer);
      previewContainerObserver.observe(previewContainer);
    }
  }, [isFirstCol, setScrollHeights]);

  // calculate scroll height values and sent back to parent comp
  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;
  //   const previewContainer = previewContainerRef.current;
  //   if (
  //     isFirstCol &&
  //     previewRendered &&
  //     !!scrollContainer &&
  //     !!previewContainer
  //   ) {
  //     setScrollHeights({
  //       containerHeight: scrollContainer.offsetHeight,
  //       previewHeight: previewContainer.offsetHeight,
  //     });
  //   }
  // }, [isFirstCol, previewRendered, setScrollHeights, lastScrollToCoord]);

  // scroll to the correct place after additional columns are added
  const scrollContainer = scrollContainerRef.current;
  if (previewRendered && !!scrollContainer) {
    scrollContainer.scrollTo({ top: scrollToCoord });
  }

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
