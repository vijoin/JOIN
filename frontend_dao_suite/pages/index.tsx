import { useEffect, useState } from "react";
import type { NextPage } from "next";
//styles
import styles from "../styles/Home.module.css";
import { Text, HStack, SimpleGrid, Flex, useColorModeValue } from "@chakra-ui/react";
// components
import PageLayout from "../layouts/PageLayout";
import { SidebarFilters } from "../components/Sidebar";
import Card from "../components/Card";
import {
  AddTagOnEvent,
  CreateEvent,
  FetchCollection,
  FilterEventsBetweenDates,
  Platform,
} from "../helpers/PolybaseData";
import { Tag, EventResponse } from "../types/types";
import moment from "moment";
import { nanoid } from "nanoid";
import {
  getUnixTimestampsForThisWeek,
  getUnixTimestampsForToday,
  getUnixTimestampsForWeekend,
} from "../helpers/DateData";
import { Carousel } from "../components/Carousel";

const Home: NextPage = () => {
  const [events, setEvents] = useState<EventResponse["data"]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    readEvent();
  }, []);
  const readEvent = async () => {
    const eventsRes = await FetchCollection("Event");
    setEvents(eventsRes.data);
  };
  const createEventManual = async () => {
    const tags: Tag[] = [
      { id: "dao", name: "DAO" },
      { id: "defi", name: "DeFi" },
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
        tags
      );
    } catch (error) {
      console.log(error);
    }
  };
  const addTag = async () => {
    try {
      const tag: Tag = {
        id: "dao",
        name: "DAO",
      };
      const ans = await AddTagOnEvent("gjYYD5IiM8zAjInMrchna", tag);
    } catch (error) {}
  };
  //Filtering
  const filterTime = async (start: number, end: number) => {
    try {
      const filtered = await FilterEventsBetweenDates(start, end);
      setEvents(filtered);
    } catch (error) {
      console.log(error);
    }
  };
  const filterToday = () => {
    const [startOfDayUnix, endOfDayUnix] = getUnixTimestampsForToday();
    filterTime(startOfDayUnix, endOfDayUnix);
  };
  const filterThisWeek = () => {
    const [startOfWeekUnix, endOfWeekUnix] = getUnixTimestampsForThisWeek();
    filterTime(startOfWeekUnix, endOfWeekUnix);
    setButtonClicked(!buttonClicked);
  };
  const filterThisWeekend = () => {
    const [startOfWeekendUnix, endOfWeekendUnix] =
      getUnixTimestampsForWeekend();
    filterTime(startOfWeekendUnix, endOfWeekendUnix);
  };
  return (
    <div className={styles.container}>
      <PageLayout title="Home" footer={true}>
        <Carousel />
        <HStack align="center">
        {/* <button onClick={createEventManual}>{"Crear test  "}</button>
        <br /> */}
        <Text fontSize={'2xl'} fontWeight='medium' my={4} color={useColorModeValue("neutrals.gray.300", "neutrals.gray.100")}>Trending events</Text>
        <Flex color="brand.primary.default" gap={4}>
        <button>{"All"}</button>
        <button onClick={filterToday}>{"Today "}</button>
        <button onClick={filterThisWeek} style={{ fontWeight: buttonClicked ? "bold" : "normal" }}>{"This week"}</button>
        <button onClick={filterThisWeekend}>{"This weekend"}</button>
        </Flex>
        </HStack>
        <SimpleGrid minChildWidth="280px" spacing="20px">
          {events.map((item: EventResponse["data"], index: number) => {
            return <Card data={item.data} key={index} />;
          })}
        </SimpleGrid>
      </PageLayout>
    </div>
  );
};

export default Home;
