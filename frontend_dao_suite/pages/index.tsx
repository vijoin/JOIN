import { useEffect, useState } from "react";
import type { NextPage } from "next";
// import Hero from '../components/Hero';
//styles
import styles from "../styles/Home.module.css";
import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
// components
import PageLayout from "../layouts/PageLayout";
import { SidebarFilters } from "../components/Sidebar";
import Card from "../components/Card";
import {
  AddTagOnEvent,
  CreateEvent,
  FetchCollection,
  Platform,
  Tag,
} from "../helpers/PolybaseData";
import moment from "moment";
import { nanoid } from "nanoid";

const Home: NextPage = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    readEvent();
  }, []);
  const readEvent = async () => {
    const eventsRes = await FetchCollection("Event");
    console.log(eventsRes.data);
    setEvents(eventsRes.data);
  };
  const createEventManual = async () => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setMonth(startDate.getMonth() + 1);
      endDate.setMonth(endDate.getMonth() + 2);
      console.log(moment(startDate).unix());
      console.log(moment(endDate).unix());
      const name = "event 003";
      console.log(`${name}${moment(startDate).unix()}`);
      const tags: Tag[] = [
        { id: "dao", name: "DAO" },
        { id: "defi", name: "DeFi" },
      ];
      const newEvent = await CreateEvent(
        nanoid(),
        "calendar001",
        name,
        "this is a basic description of the event",
        "QmR8h1s4cyNJELt1MBeyVJUgArDLNvseeiXAwtLicWDQvg",
        "Dash House California",
        Platform.Twitter,
        "https://twitter.com/marketersweb3/status/1665810617704259584?s=20",
        true,
        moment(startDate).unix(),
        moment(endDate).unix()
        // tags,
      );
      console.log(newEvent);
    } catch (error) {
      console.log(error);
    }
  };
  const addTag = async () => {
    try {
      const tag:Tag = {
        id: 'dao',
        name: 'DAO'
      }
      const ans = await AddTagOnEvent('Dw0izRJ1hnqOhNDq1sASb', tag);
      console.log(ans);
    } catch (error) {}
  };
  return (
    <div className={styles.container}>
      <PageLayout title="Home" footer={true}>
        {/* <Hero /> */}
        <button onClick={addTag}>Crear test</button>
        <Grid templateColumns="repeat(8, 1fr)">
          <GridItem colSpan={1} bg="tomato">
            <SidebarFilters />
          </GridItem>
          <GridItem colSpan={7} px={6} py={8}>
            <SimpleGrid minChildWidth="300px" spacing="20px">
              {events.map((item, index) => {
                return <Card data={item.data} key={index}/>;
              })}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </PageLayout>
    </div>
  );
};

export default Home;
