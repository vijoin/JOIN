import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import styled from "@emotion/styled";
import EventModal from "../../components/modals/eventModal";

const index = () => {
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
       <EventModal 
        isOpen={modalEvent}
        onClose={closeModal}
       />
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
