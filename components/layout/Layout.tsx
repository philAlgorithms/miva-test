import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import Header from '../navigation/Header';

export interface ILayout {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ title, children }) => {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <Container maxW="7xl" className="px-5 md:px-10">
        <Header />
        {children}
      </Container>
    </>
  );
};

export default Layout;
