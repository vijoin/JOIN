import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Text, HStack, SimpleGrid, Flex, useColorModeValue, Box } from "@chakra-ui/react";
// components
import PageLayout from "../layouts/PageLayout";
import Card from "../components/Card";
import {
  FetchCollection, FilterEventsBetweenDates,
} from "../helpers/PolybaseData";
import { EventResponse } from "../types/types";
import { Carousel } from "../components/Carousel";
import { EventsContext } from "../context/EventsContext";
import gasper from "../assets/images/gasper.png";
import { getUnixTimestampsForThisWeek, getUnixTimestampsForToday, getUnixTimestampsForWeekend } from "../helpers/DateData";
import Image from "next/image";

const Home: NextPage = () => {
  const [events, setEvents] = useState<EventResponse["data"]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    readEvents();
  }, []);
  const readEvents = async () => {
    const eventsRes = await FetchCollection("Event");
    setEvents(eventsRes.data);
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
        <Text fontSize={'2xl'} fontWeight='medium' my={4} color={useColorModeValue("neutrals.gray.300", "neutrals.gray.100")}>Trending events</Text>
        <Flex color="brand.primary.default" gap={4}>
        <button>{"All"}</button>
        <button onClick={filterToday}>{"Today "}</button>
        <button onClick={filterThisWeek} style={{ fontWeight: buttonClicked ? "bold" : "normal" }}>{"This week"}</button>
        <button onClick={filterThisWeekend}>{"This weekend"}</button>
        </Flex>
        </HStack>
        <SimpleGrid minChildWidth="280px" spacing="20px">
        {events.length > 0 ? (
    events.map((item: EventResponse["data"], index: number) => (
      <Card data={item.data} key={index} />
    ))
  ) : (
    <Flex textAlign="center" w="100%" alignItems={'center'} direction={"column"} mt={32}>
         <Image
          src={gasper}
          alt="No events"
          width={120}
        />
      <Text fontSize={"2xl"} mt={2} color="neutrals.gray.100" fontWeight={'normal'}>Oops! Only Gasper is left here.</Text>
    </Flex>
  )}
        </SimpleGrid>
      </PageLayout>
    </div>
  );
};

export default Home;
