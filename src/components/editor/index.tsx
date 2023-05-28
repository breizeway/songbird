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
  const [source, setSource] = useState("");
  const [sourceSelection, setSourceSelection] = useState<[number, number]>([
    0, 0,
  ]);

  const [devMode, _setDevMode] = useState(false);
  const toggleDevMode = useCallback(() => {
    const newDevMode = !devMode;
    _setDevMode(newDevMode);
    (typeof localStorage !== "undefined" ? localStorage : null)?.setItem(
      "devMode",
      `${newDevMode}`
    );
    source === "" && setSource(testSong);
  }, [devMode, source]);
  useEffect(() => {
    const savedDevMode =
      (typeof localStorage !== "undefined" ? localStorage : null)?.getItem(
        "devMode"
      ) === "true";
    _setDevMode(savedDevMode);
    savedDevMode && setSource(testSong);
  }, []);

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

      if (e.shiftKey && e.ctrlKey && e.altKey && e.key === "Î") {
        e.preventDefault();
        toggleDevMode();
      }
    };

    document.body.addEventListener("keydown", listenForShortcuts);
    return () =>
      document.body.removeEventListener("keydown", listenForShortcuts);
  }, [View, view, toggleDevMode]);

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
                label: "Edit",
              },
              {
                id: View.preview,
                label: "Preview",
              },
            ]}
            value={view}
            setValue={setView}
            className={styles.viewSwitch}
          />
          {devMode && (
            <div className={styles.controlGroup + " " + "gap-2"}>
              <button
                className={styles.control}
                onClick={() => {
                  setSource(testSong);
                  triggerSync();
                }}
              >
                Test Lyrics
              </button>
              <button
                className={styles.control}
                onClick={() => {
                  setSource(testMd);
                  triggerSync();
                }}
              >
                Test Markdown
              </button>
            </div>
          )}
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
          {...{ source, setSource, sourceSelection, setSourceSelection }}
        />
      ) : (
        <TextPreview {...{ source }} />
      )}
    </div>
  );
};
