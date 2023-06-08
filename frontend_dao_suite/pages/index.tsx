import type { NextPage } from "next";
// import Hero from '../components/Hero';
//styles
import styles from "../styles/Home.module.css";
import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
// components
import PageLayout from "../layouts/PageLayout";
import { SidebarFilters } from "../components/Sidebar";
import  Card from "../components/Card";
import CardDetails from "../components/CardDetails";

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
            <CardDetails/>
          </SimpleGrid>
          </GridItem>
        </Grid>
      </PageLayout>
    </div>
  );
};

export default Home;
