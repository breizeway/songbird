import styles from "./footer.module.css";

interface IFooterProps {}

export const Footer = ({}: IFooterProps): JSX.Element => {
  return (
    <footer id="footer" className={styles.comp}>
      <a href="https://github.com/breizeway/tab-lab" target="_blank">
        about this site
      </a>
      <span className={styles.copyright}>
        © Tannor Breitigam {new Date().getFullYear()}
      </span>
    </footer>
  );
};
