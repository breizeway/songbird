import syncIcon from "@/assets/icons/sync.svg";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { ContextSwitch } from "../contextSwitch";
import { Icon } from "../svg/svg";
import { Demo } from "./components/demo";
import { TextEdit } from "./components/text-edit";
import { TextPreview } from "./components/text-preview";
import styles from "./editor.module.css";

export interface SourcePosition {
  selectionRange: [number, number];
  scrollTop: number;
}

export const Editor = ({}): JSX.Element => {
  const [source, setSource] = useState("");
  const [sourcePosition, setSourcePosition] = useState<SourcePosition>({
    selectionRange: [0, 0],
    scrollTop: 0,
  });

  enum View {
    edit = "edit",
    preview = "preview",
  }
  const [view, setView] = useState<View>(source ? View.preview : View.edit);

  useEffect(() => {
    const listenForShortcuts = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "e") {
        e.preventDefault();
        setView(view === View.edit ? View.preview : View.edit);
      }
    };

    document.body.addEventListener("keydown", listenForShortcuts);
    return () =>
      document.body.removeEventListener("keydown", listenForShortcuts);
  }, [View, view]);

  const [_, _setSync] = useState({});
  const triggerSync = () => {
    _setSync({});
  };

  return (
    <div className={styles.comp}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <ContextSwitch
            options={[
              {
                id: View.edit,
                name: "Edit",
              },
              {
                id: View.preview,
                name: "Preview",
              },
            ]}
            value={view}
            setValue={setView}
            className={styles.viewSwitch}
          />
          <Demo {...{ source, setSource }} />
        </div>
        <button
          onClick={triggerSync}
          className={classNames(
            styles.control,
            view === View.edit ? "hidden" : ""
          )}
        >
          <Icon
            srcLight={syncIcon}
            alt="two arrows in a circle"
            className={styles.icon}
          />
        </button>
      </div>
      {view === View.edit ? (
        <TextEdit
          {...{ source, setSource, sourcePosition, setSourcePosition }}
        />
      ) : (
        <TextPreview {...{ source }} />
      )}
    </div>
  );
};
