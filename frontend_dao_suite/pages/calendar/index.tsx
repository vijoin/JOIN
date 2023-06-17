import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import styled from "@emotion/styled";
import "dotenv/config";
import PageLayout from "../../layouts/PageLayout";
import CalendarHolder from "../../components/CalendarHolder";
import { FetchCollection, FetchKeyCollection } from "../../helpers/PolybaseData";

const Index = () => {
  useEffect(() => {
    readData();
  }, []);
  const readData = async () => {
    try {
      const tagInfo = await FetchKeyCollection("Tag", "dao");
      const collections = await FetchCollection("Event");
    } catch (error) {
      console.log(error);
    }
  };
  
  const [modalEvent, setModalEvent] = useState(false);
  const onDateClick = (arg: any) => {
    setModalEvent(true);
  };
  const closeModal = () => {
    setModalEvent(false);
  };

  return (
    <PageLayout title="Calendar" footer={true}>
      <CalendarHolder/>
    </PageLayout>
  );
};

export default Index;

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
