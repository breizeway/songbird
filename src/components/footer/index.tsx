import styles from "./footer.module.css";

interface IFooterProps {}

export const Footer = ({}: IFooterProps): JSX.Element => {
  return (
    <footer id="footer" className={styles.footer}>
      footer
    </footer>
  );
};
