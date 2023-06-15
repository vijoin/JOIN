import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  Text,
  HStack,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Box,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
// components
import PageLayout from "../layouts/PageLayout";
import Card from "../components/Card";
import {
  FetchCollection,
  FilterEventsBetweenDates,
} from "../helpers/PolybaseData";
import { EventResponse } from "../types/types";
import { Carousel } from "../components/Carousel";
import { EventsContext } from "../context/EventsContext";
import {
  getUnixTimestampsForThisWeek,
  getUnixTimestampsForToday,
  getUnixTimestampsForWeekend,
} from "../helpers/DateData";
import { CollectionRecordResponse } from "@polybase/client/dist/Record";
import { startOfDay } from "@fullcalendar/core/internal";

const Home: NextPage = () => {
  const [events, setEvents] = useState<EventResponse["data"]>([]);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState({
    all: false,
    today: false,
    thisWeek: true,
    weekend: false,
  });
  useEffect(() => {
    filterThisWeek();
  }, []);
  const readallEvents = async () => {
    const eventsRes = await FetchCollection("Event");
    setEvents(eventsRes.data);
    setButtonWeight(0);
  };
  //Filtering
  const filterTime = async (start: number, end: number) => {
    try {
      setLoading(true);
      const filtered = await FilterEventsBetweenDates(start, end);
      setEvents(filtered);
      if (filtered.length <= 0) readallEvents();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const filterToday = () => {
    const [startOfDayUnix, endOfDayUnix] = getUnixTimestampsForToday();
    filterTime(startOfDayUnix, endOfDayUnix);
    setButtonWeight(1);
  };
  const filterThisWeek = () => {
    const [startOfDayUnix] = getUnixTimestampsForToday();
    const [endOfWeekUnix] = getUnixTimestampsForThisWeek();
    filterTime(startOfDayUnix, endOfWeekUnix);
    setButtonWeight(2);
  };
  const filterThisWeekend = () => {
    const [startOfDayUnix] = getUnixTimestampsForToday();
    const [startOfWeekendUnix, endOfWeekendUnix] =
      getUnixTimestampsForWeekend();
    filterTime(
      startOfDayUnix > startOfWeekendUnix ? startOfDayUnix : startOfWeekendUnix,
      endOfWeekendUnix
    );
    setButtonWeight(3);
  };
  const setButtonWeight = (index: number) => {
    switch (index) {
      case 0:
        setButtonClicked({
          ...buttonClicked,
          all: true,
          today: false,
          thisWeek: false,
          weekend: false,
        });
        break;
      case 1:
        setButtonClicked({
          ...buttonClicked,
          all: false,
          today: true,
          thisWeek: false,
          weekend: false,
        });
        break;
      case 2:
        setButtonClicked({
          ...buttonClicked,
          all: false,
          today: false,
          thisWeek: true,
          weekend: false,
        });
        break;
      case 3:
        setButtonClicked({
          ...buttonClicked,
          all: false,
          today: false,
          thisWeek: false,
          weekend: true,
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.container}>
      <PageLayout title="Home" footer={true}>
        <Carousel />
        <HStack align="center">
          <Text
            fontSize={"2xl"}
            fontWeight="medium"
            my={4}
            color={useColorModeValue("neutrals.gray.300", "neutrals.gray.100")}
          >
            Trending events
          </Text>
          <Flex color="brand.primary.default" gap={4}>
            <button
              onClick={readallEvents}
              style={{ fontWeight: buttonClicked.all ? "bold" : "normal" }}
            >
              {"All"}
            </button>
            <button
              onClick={filterToday}
              style={{ fontWeight: buttonClicked.today ? "bold" : "normal" }}
            >
              {"Today "}
            </button>
            <button
              onClick={filterThisWeek}
              style={{ fontWeight: buttonClicked.thisWeek ? "bold" : "normal" }}
            >
              {"This week"}
            </button>
            <button
              onClick={filterThisWeekend}
              style={{ fontWeight: buttonClicked.weekend ? "bold" : "normal" }}
            >
              {"This weekend"}
            </button>
          </Flex>
        </HStack>
        {loading ? (
          <SimpleGrid minChildWidth="280px" spacing="20px">
            {Array.from({ length: 12 }).map((_, index) => (
              <Box key={index} padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size='10' />
                <SkeletonText
                  mt="4"
                  noOfLines={10}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid minChildWidth="280px" spacing="20px">
            {events.map(
              (item: CollectionRecordResponse<any, any>, index: number) => {
                return <Card event={item} key={index} />;
              }
            )}
          </SimpleGrid>
        )}
      </PageLayout>
    </div>
  );
};

export default Home;
