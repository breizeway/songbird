import { Theme } from "../theme";
import styles from "./header.module.css";

interface IHeaderProps {}

export const Header = ({}: IHeaderProps): JSX.Element => {
  return (
    <header id="header" className={styles.header}>
      <div>SongBird</div>
      <Theme />
    </header>
  );
};
