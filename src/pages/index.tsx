import React from "react";
import styles from "./index.module.css";
import classNames from "classnames"


interface IHomeProps {
};

const Home = ({
}: IHomeProps): JSX.Element => {
  return (
    <>
    <div className={classNames(styles.test, styles.test2)}>
      test
    </div>
    </>
  );
};

export default Home