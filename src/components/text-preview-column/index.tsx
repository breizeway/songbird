import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollVals } from "../text-preview";
import styles from "./text-preview-column.module.css";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

interface ITextPreviewColumnProps {
  source: string;
  columnIndex: number;
  numColumns: number;
  scrollVals: ScrollVals;
  setScrollVals: (scrollVals: ScrollVals) => void;
}

export const TextPreviewColumn = ({
  source,
  columnIndex,
  numColumns,
  scrollVals,
  setScrollVals,
}: ITextPreviewColumnProps): JSX.Element => {
  const [previewRendered, setPreviewRendered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // calculate scroll height values and sent back to parent comp
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (columnIndex === 0 && previewRendered && !!scrollContainer) {
      setScrollVals({
        containerHeight: scrollContainer.offsetHeight,
        contentHeight: scrollContainer.scrollHeight,
      });
    }
  }, [columnIndex, previewRendered, setScrollVals, numColumns]);

  // scroll to the correct place after additional columns are added
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (columnIndex !== 0 && previewRendered && !!scrollContainer) {
      const topOffset = columnIndex * scrollVals.containerHeight;
      const scrollToOptions: ScrollToOptions = { top: topOffset };
      scrollContainer.scrollTo(scrollToOptions);
    }
  }, [columnIndex, previewRendered, setScrollVals, numColumns, scrollVals]);

  // whitespace to add at the bottom of last column
  // const [whitespaceHeight, setWhitespaceHeight] = useState(0)
  // const Whitespace = () => {
  //   const percentWhitespaceNeeded: number = Math.ceil(
  //     (((scrollVals.contentHeight || 0) % (scrollVals.containerHeight || 0)) /
  //       (scrollVals.containerHeight || 0)) *
  //       100
  //   );
  //   const height = `${percentWhitespaceNeeded}%`;
  //   console.log(`:::HEIGHT::: `, height);
  //   return (
  //     <>{columnIndex === numColumns - 1 ? <div style={{ height }} /> : null}</>
  //   );
  // };
  const calcWhitespace = () => {
    // if (
    //   Object.values(scrollVals).some((val) => val === 0) ||
    //   columnIndex === numColumns - 1
    // )
    return 0;
    // console.log(`:::SCROLLVALS::: `, scrollVals);

    // const lastColHeight = scrollVals.contentHeight % scrollVals.containerHeight;
    // console.log(`:::LASTCOLHEIGHT::: `, lastColHeight);
    // const percentWhitespaceNeeded =
    //   ((scrollVals.containerHeight - lastColHeight) /
    //     scrollVals.containerHeight) *
    //   100;
    // console.log(`:::PERCENTWHITESPACENEEDED::: `, percentWhitespaceNeeded);

    // return Math.floor(percentWhitespaceNeeded) - 1;
  };

  return (
    <div className={styles.comp}>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <MarkdownPreview
          source={source}
          className={styles.preview}
          rehypeRewrite={(node) => {
            if (node.type === "root") {
              setTimeout(() => setPreviewRendered(true));
            }
          }}
        />
        <div style={{ height: `${calcWhitespace()}%` }} />
      </div>
    </div>
  );
};
