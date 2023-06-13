import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { SimpleGrid } from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";
import Card from "../components/Card";
import {
  FetchCollection,
} from "../helpers/PolybaseData";
import { EventResponse } from "../types/types";
import { Carousel } from "../components/Carousel";
import { EventsContext } from "../context/EventsContext";

const Home: NextPage = () => {
  const [events, setEvents] = useState<EventResponse["data"]>([]);
  useEffect(() => {
    readEvents();
  }, []);
  const readEvents = async () => {
    const eventsRes = await FetchCollection("Event");
    setEvents(eventsRes.data);
  };
  
  return (
    <EventsContext.Provider value={{events, setEvents}}>
      <div className={styles.container}>
        <PageLayout title="Home" footer={true}>
          <Carousel />
          <SimpleGrid minChildWidth="300px" spacing="20px">
            {events.map((item: EventResponse["data"], index: number) => {
              return <Card data={item.data} key={index} />;
            })}
          </SimpleGrid>
        </PageLayout>
      </div>
    </EventsContext.Provider>
  );
};

export default Home;
