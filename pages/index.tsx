import Layout from '@/components/layout/Layout';
import { NextPageWithLayout } from './page';

export interface IHome {}
const Home: NextPageWithLayout<IHome> = () => {
  return <></>;
};

export default Home;

Home.getLayout = (page) => {
  return <Layout title="Miva University -Home pAge">{page}</Layout>;
};
