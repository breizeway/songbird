import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";
import { useTheme } from "@/hooks/use-theme";
import Image from "next/image";
import styles from "./header.module.css";

interface IHeaderProps {}

export const Header = ({}: IHeaderProps): JSX.Element => {
  const { isLight } = useTheme();

  const logo = isLight ? logoLight : logoDark;

  return (
    <header id="header" className={styles.comp}>
      <Image src={logo} alt="songbird logo" className={styles.logo} />
      <span>SongBird</span>
    </header>
  );
};
