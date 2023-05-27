import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import syncIcon from "../../assets/sync.svg";
import { ContextSwitch } from "../contextSwitch";
import { Icon } from "../svg/svg";
import { TextEdit } from "./components/text-edit";
import { TextPreview } from "./components/text-preview";
import styles from "./editor.module.css";
import { testMd } from "./test-md";
import { testSong } from "./test-song";

export const Editor = ({}): JSX.Element => {
  const [text, setText] = useState(testSong);
  const [sync, _setSync] = useState({});
  const triggerSync = () => {
    _setSync({});
  };

  enum View {
    edit = "edit",
    preview = "preview",
  }
  const [view, _setView] = useState<View>(text ? View.preview : View.edit);
  const toggleView = useCallback(() => {
    _setView(view === View.edit ? View.preview : View.edit);
  }, [View, view]);

  useEffect(() => {
    const listenForShortcuts = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "e") {
        e.preventDefault();
        toggleView();
      }
    };

    document.body.addEventListener("keydown", listenForShortcuts);
    return () =>
      document.body.removeEventListener("keydown", listenForShortcuts);
  }, [toggleView]);

  return (
    <div className={styles.comp}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <ContextSwitch
            name="view-mode"
            options={[
              {
                id: View.edit,
                label: "Edit",
              },
              {
                id: View.preview,
                label: "Preview",
              },
            ]}
            value={view}
            setValue={_setView}
            className={styles.viewSwitch}
          />

          <button
            onClick={triggerSync}
            className={classNames(view === View.edit ? "hidden" : "")}
          >
            <Icon
              srcLight={syncIcon}
              alt="two arrows in a circle"
              className={styles.icon}
            />
          </button>
        </div>
        <div className={styles.controlGroup}>
          <button
            onClick={() => {
              setText(testSong);
              triggerSync();
            }}
          >
            Test Lyrics
          </button>
          <button
            onClick={() => {
              setText(testMd);
              triggerSync();
            }}
          >
            Test Markdown
          </button>
        </div>
      </div>
      {view === View.edit ? (
        <TextEdit text={text} setText={setText} />
      ) : (
        <TextPreview source={text} sync={sync} />
      )}
    </div>
  );
};
