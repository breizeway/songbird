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
  const previewRef = useRef<HTMLDivElement>(null);

  // calculate scroll height values and sent back to parent comp
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const preview = previewRef.current;
    if (
      columnIndex === 0 &&
      previewRendered &&
      !!scrollContainer &&
      !!preview
    ) {
      setScrollVals({
        containerHeight: scrollContainer.offsetHeight,
        contentHeight: preview.offsetHeight,
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

  // get percentage of of last container is content to fill the rest with whitespace
  const calcWhitespace = () => {
    if (
      columnIndex < numColumns - 1 ||
      Object.values(scrollVals).some((val) => val === 0)
    )
      return 0;

    const lastColHeight = scrollVals.contentHeight % scrollVals.containerHeight;
    const percentWhitespaceNeeded =
      ((scrollVals.containerHeight - lastColHeight) /
        scrollVals.containerHeight) *
      100;

    return percentWhitespaceNeeded;
  };

  return (
    <div className={styles.comp}>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <div ref={previewRef}>
          <MarkdownPreview
            source={source}
            className={styles.preview}
            rehypeRewrite={(node) => {
              if (node.type === "root") {
                setTimeout(() => setPreviewRendered(true));
              }
            }}
          />
        </div>
        <div style={{ height: `${calcWhitespace()}%` }} />
      </div>
    </div>
  );
};
