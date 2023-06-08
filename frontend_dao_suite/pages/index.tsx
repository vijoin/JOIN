import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
// import Head from 'next/head';
import styles from "../styles/Home.module.css";
import PageLayout from "../layouts/PageLayout";
// import Hero from '../components/Hero';
import { Grid, GridItem } from "@chakra-ui/react";
import { SidebarFilters } from "../components/SidebarFilters";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PageLayout title="Home" footer={true}>
        {/* <Hero /> */}
        <Grid templateColumns="repeat(8, 1fr)">
          <GridItem colSpan={1} bg="tomato">
            <SidebarFilters />
          </GridItem>
          <GridItem colSpan={7} bg="papayawhip" />
        </Grid>
      </PageLayout>
    </div>
  );
};

export default Home;
