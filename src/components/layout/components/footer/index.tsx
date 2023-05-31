import styles from "./footer.module.css";

interface IFooterProps {}

export const Footer = ({}: IFooterProps): JSX.Element => {
  return (
    <footer id="footer" className={styles.comp}>
      <a href="https://github.com/breizeway/tab-lab" target="_blank">
        About SongBird
      </a>
      <span className={styles.copyright}>
        © {new Date().getFullYear()} Tannor Breitigam
      </span>
    </footer>
  );
};
