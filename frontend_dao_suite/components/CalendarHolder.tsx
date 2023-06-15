import { useState } from 'react';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from '@chakra-ui/react';
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../components/modals/EventModal";
import { Auth } from '@polybase/auth';
import { CreateUser } from '../helpers/PolybaseData';
import { Polybase } from "@polybase/client";


export default function CalendarHolder() {
  const [modalEvent, setModalEvent] = useState(false);
  const onDateClick = (arg: any) => {
    console.log(arg);
    setModalEvent(true);
  };
  const closeModal = () => {
    setModalEvent(false);
  };
  const test = async () => {
    try {
      console.log(localStorage.getItem("address"));
      const address = localStorage.getItem("address");
      const createUser = await CreateUser(address, address);
      console.log(createUser);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        p={{ base: 6, md: 8 }}
        bg="white"
        borderRadius={'3xl'}
        >
        <FullCalendar
              plugins={[dayGridPlugin,interactionPlugin]}
              initialView="dayGridMonth"
              events={[
                { title: " 🪢 ETHGLobal SF", start: "2023-06-04", end:"2023-06-08", url: "http://www.google.com", backgroundColor: '#e6f4d6', borderColor:"#e6f4d6", textColor:'#7A7A86' },
                { title: " 🪢 ETHGLobal SF", start: "2023-06-12", end:"2023-06-18", url: "http://www.google.com", backgroundColor: '#e0ebff', borderColor:"#e0ebff", textColor:'#7A7A86' },
                { title: " 🪢 ETHGLobal SF", start: "2023-06-25", end:"2023-06-28", url: "http://www.google.com", backgroundColor: '#fef0c8', borderColor:"#fef0c8", textColor:'#7A7A86' },
                { title: "🦄 Polkadot", date: "2023-06-06", duration: '06:00', allDay: false, displayEventEnd: true },
                { title: 'my event', start: "2023-06-03",duration: '06:00', allDay: false, displayEventEnd: true, backgroundColor: '#f6f6f6', borderColor:"#f6f6f6",   googleCalendarId: 'abcd1234@group.calendar.google.com',}
              ]}
              slotDuration= "01:00:00"
              // slotMaxTime="12:00:00"
              dayHeaderFormat={{weekday: 'short', day: 'numeric'}}
              eventBackgroundColor= '#5155DA'
              dateClick={onDateClick}
              height={"auto"}
              headerToolbar={{
                start: "title",
                center: "",
                end: "dayGridMonth today prev,next",
              }}
            />
      </Stack>
      <EventModal isOpen={modalEvent} onClose={closeModal} />
    </Container>
    </>
  );
}