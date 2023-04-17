import classNames from "classnames";
import styles from "./index.module.css";

interface IHomeProps {}

const Home = ({}: IHomeProps): JSX.Element => {
  return <div className={classNames(styles.home)}>home page</div>;
};

export default Home;
