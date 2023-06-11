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
  fetchEventsByDate,
  FilterEventsBetweenDates,
  Platform,
} from "../helpers/PolybaseData";
import { Tag, EventResponse } from "../types/types";
import moment from "moment";
import { nanoid } from "nanoid";

const Home: NextPage = () => {
  const [events, setEvents] = useState<EventResponse["data"]>([]);
  useEffect(() => {
    readEvent();
  }, []);
  const readEvent = async () => {
    const eventsRes = await FetchCollection("Event");
    console.log(eventsRes.data);
    setEvents(eventsRes.data);
  };
  const createEventManual = async () => {
    const tags : Tag[] = [
      {id: 'dao', name: 'DAO'},
      {id: 'defi', name: 'DeFi'}
    ];
    try {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setMonth(startDate.getMonth() + 1);
      endDate.setMonth(endDate.getMonth() + 2);
      endDate.setDate(endDate.getDate() + 3);
      const name = "event 007";
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
        moment(endDate).unix(),
        moment().unix(),
        tags,
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
      const ans = await AddTagOnEvent('gjYYD5IiM8zAjInMrchna', tag);
      console.log(ans);
    } catch (error) {}
  };
  const filterToday = async () => {
    try {
      const filtered = await FilterEventsBetweenDates(1686700790, 1686700810);
      console.log(filtered);
      setEvents(filtered);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.container}>
      <PageLayout title="Home" footer={true}>
        {/* <Hero /> */}
        <button onClick={createEventManual}>{'Crear test '}</button>
        <button onClick={filterToday}>{'Filter today '}</button>
        <Grid templateColumns="repeat(8, 1fr)">
          <GridItem colSpan={1} bg="tomato">
            <SidebarFilters />
          </GridItem>
          <GridItem colSpan={7} px={6} py={8}>
            <SimpleGrid minChildWidth="300px" spacing="20px">
              {events.map((item : EventResponse["data"], index : number) => {
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
