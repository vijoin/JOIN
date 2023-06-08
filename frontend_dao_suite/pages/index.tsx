import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
// import Head from 'next/head';
import styles from "../styles/Home.module.css";
import PageLayout from "../layouts/PageLayout";
// import Hero from '../components/Hero';
import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { SidebarFilters } from "../components/Sidebar";
import  Card from "../components/Card";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PageLayout title="Home" footer={true}>
        {/* <Hero /> */}
        <Grid templateColumns="repeat(8, 1fr)">
          <GridItem colSpan={1} bg="tomato">
            <SidebarFilters />
          </GridItem>
          <GridItem colSpan={7} px={6} py={8}>
          <SimpleGrid  minChildWidth='120px' spacing='20px'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </SimpleGrid>
          </GridItem>
        </Grid>
      </PageLayout>
    </div>
  );
};

export default Home;
