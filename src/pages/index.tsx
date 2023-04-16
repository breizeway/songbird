import classNames from "classnames";
import styles from "./index.module.css";

interface IHomeProps {}

const Home = ({}: IHomeProps): JSX.Element => {
  return (
    <>
      <div className={classNames(styles.test, styles.test2)}>test</div>
    </>
  );
};

export default Home;
