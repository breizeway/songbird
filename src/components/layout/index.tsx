import { PropsWithChildren } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import styles from "./layout.module.css";

export const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div id="layout" className={styles.layout}>
      <Header />
      <main id="main" className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
