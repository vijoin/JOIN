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
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Meeting scheduling{' '}
          <Text as={'span'} color={'orange.400'}>
            JOIN
          </Text>
        </Heading>
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
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}
            onClick={test}
            >
            Login
          </Button>
          <Button rounded={'full'} px={6}>
            Join as community
          </Button>
        </Stack>
      </Stack>
      <EventModal isOpen={modalEvent} onClose={closeModal} />
    </Container>
  );
}