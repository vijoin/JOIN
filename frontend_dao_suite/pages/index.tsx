import type { NextPage } from "next";
//styles
import styles from "../styles/Home.module.css";
import { SimpleGrid } from "@chakra-ui/react";
// components
import PageLayout from "../layouts/PageLayout";
import  Card from "../components/Card";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PageLayout title="Home" footer={true}>
          <SimpleGrid  minChildWidth='300px' spacing='20px'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </SimpleGrid>
      </PageLayout>
    </div>
  );
};

export default Home;
