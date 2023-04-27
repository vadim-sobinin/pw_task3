import { FC, ReactNode } from 'react';
import { Footer } from './Footer';
import Header from './Header';
import Head from 'next/head';

type layoutType = {
  children: ReactNode;
};

export const Layout: FC<layoutType> = ({ children }) => {
  return (
    <>
      {/* <Head>
        <link rel="preload" href="fonts/THICCCBOI-SemiBold.woff2" as="font" type="font/woff2" />
        <link rel="preload" href="fonts/THICCCBOI-Medium.woff2" as="font" type="font/woff2" />
        <link rel="preload" href="fonts/THICCCBOI-Bold.woff2" as="font" type="font/woff2" />
        <link rel="preload" href="fonts/Inter-Variable.woff2" as="font" type="font/woff2" />
      </Head> */}
      <Header />
      {children}
      <Footer />
    </>
  );
};
