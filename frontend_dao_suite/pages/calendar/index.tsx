import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import styled from "@emotion/styled";
import EventModal from "../../components/modals/EventModal";
import { Polybase } from "@polybase/client";
import "dotenv/config";

const index = () => {
  const db = new Polybase({
    defaultNamespace: "pk/0xb5f85f82153b100b238a20c23297acc9d38f91b3aab0dcd5722b1b870433ef3b6baef2a0d70970bfe49e45d8e29e4ea8edb5638b6d06a49db9957ccc4775a7d5/DAOSuite",
  });

  useEffect(() => {
    readData();
  }, []);
  const readData = async () => {
    try {
      const  {data}  = await db.collection("Tag").record("dao").get();
      console.log(data);
      console.log("Tag id:", data.id);
      console.log("Tag name:", data.name);
    } catch (error) {
      console.log(error);
    }
  }

  const [modalEvent, setModalEvent] = useState(false);
  const onDateClick = (arg: any) => {
    console.log(arg);
    setModalEvent(true);
  };
  const closeModal = () => {
    setModalEvent(false);
  };

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2023-06-04" },
          { title: "event 2", date: "2023-06-06" },
        ]}
        dateClick={onDateClick}
        height={"auto"}
      />
      <EventModal isOpen={modalEvent} onClose={closeModal} />
    </Container>
  );
};

export default index;

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
