import { useState } from "react";
import { Pane } from "../pane";
import styles from "./window.module.css";

interface IWindowProps {}

export const Window = ({}: IWindowProps): JSX.Element => {
  const INIT_NUM_PANES = 3;
  const MIN_NUM_PANES = 1;

  const [text, setText] = useState("");
  const [numPanes, _setNumPanes] = useState(INIT_NUM_PANES);

  const updateNumPanes = (change: "increase" | "decrease") => {
    if (change === "decrease" && numPanes > MIN_NUM_PANES)
      _setNumPanes(numPanes - 1);
    if (change === "increase") _setNumPanes(numPanes + 1);
  };

  return (
    <>
      <div className={styles.controls}>
        <button onClick={() => updateNumPanes("decrease")}>{"-"}</button>
        <button onClick={() => updateNumPanes("increase")}>{"+"}</button>
        <button onClick={() => {}}>{"Sync"}</button>
      </div>
      <table className={styles.main}>
        <thead></thead>
        <tbody>
          <tr>
            {[...Array(numPanes)].map((idx) => (
              <td key={idx}>
                <Pane paneIdx={idx} text={text} setText={setText} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};
