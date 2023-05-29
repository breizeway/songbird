import logoDark from "@/assets/icons/logo-dark.svg";
import logoLight from "@/assets/icons/logo-light.svg";
import { Icon } from "@/components/svg/svg";
import styles from "./header.module.css";

export const Header = ({}): JSX.Element => (
  <header id="header" className={styles.comp}>
    <Icon
      srcLight={logoLight}
      srcDark={logoDark}
      alt="songbird logo"
      className={styles.logo}
    />
    <span>SongBird</span>
  </header>
);
