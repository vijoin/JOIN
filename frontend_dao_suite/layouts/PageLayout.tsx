import React from "react";
import { ReactNode } from "react";

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children: JSX.Element | JSX.Element[] | ReactNode;
  title: string;
  footer: boolean;
};
const PageLayout = ({ title, children, footer }: Props) => {
  const pageTitle = `DAOTool | ${title}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main>{children}</main>
      </div>
      {footer && <Footer />}
    </>
  );
};

export default PageLayout;
