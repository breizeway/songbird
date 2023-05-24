import { Editor } from "@/components/editor";
import Head from "next/head";

interface IHomeProps {}

const Home = ({}: IHomeProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>SongBird</title>
      </Head>
      <Editor />
    </>
  );
};

export default Home;
