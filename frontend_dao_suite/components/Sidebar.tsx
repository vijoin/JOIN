import React, { useContext, useState } from "react";
import {
  Text,
  Box,
  Heading,
  Stack,
  Checkbox,
  Link,
  useColorModeValue,
  Flex,
  VStack,
  Radio,
  RadioGroup,
  Switch,
  FormLabel,
  FormControl,
  Button,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import logoLight from "../assets/images/logo.png";
import logoDark from "../assets/images/logo_dark.png";
import { EventsContext } from "../context/EventsContext";
import { AddTagOnEvent, CreateEvent, FilterEventsBetweenDates, Platform } from "../helpers/PolybaseData";
import { getUnixTimestampsForThisWeek, getUnixTimestampsForToday, getUnixTimestampsForWeekend } from "../helpers/DateData";
import { Tag } from "../types/types";
import { nanoid } from "nanoid";
import moment from "moment";

export const SidebarFilters = ({}) => {
  const { colorMode } = useColorMode();
  const logoSrc = colorMode === "dark" ? logoDark : logoLight;
  const { setEvents } = useContext(EventsContext);
  const [dateFilter, setDateFilter] = useState<string>("0");
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
  };
  const filterThisWeekend = () => {
    const [startOfWeekendUnix, endOfWeekendUnix] =
      getUnixTimestampsForWeekend();
    filterTime(startOfWeekendUnix, endOfWeekendUnix);
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
  //Buttons
  const onFilter = () => {
    // if(dateFilter !== '0'){
    switch (dateFilter) {
      case "1":
        filterToday();
        break;
      case "2":
        filterThisWeek();
        break;
      case "3":
        filterThisWeekend();
        break;
      default:
        break;
    }
    // } else if () {

    // }
  };
  const handleRadioChange = (value: string) => {
    setDateFilter(value);
  };

  return (
    <Box width={'100%'} p={4} bg={useColorModeValue('neutrals.light.100', 'neutrals.gray.400')} mx={6} my={4} borderRadius={'3xl'}>
    <Stack spacing={4}>
    <Flex justify={'start'}>
      <Link  href="/">
    <Image alt="StratEx"
      src={logoSrc}
      width={80}
      height={80} />
      </Link>
    </Flex>
    <Text color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}  fontWeight={'normal'}> Welcome, Sebas 👋</Text>
    <VStack justifyContent={'space-between'} align={'start'} gap={6} >
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")} >Platform</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Twitter</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Twitch</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Youtube</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Activity</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Conference</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Hackathon</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Meetup</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Location</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Asia</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>LatAm</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Europe</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Community</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Ethereum</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Polygon</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Bitcoin</Checkbox>
    </VStack>
    {/* <VStack align={'start'}>
    <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Date</Heading>
    <RadioGroup>
    <Stack direction='column' color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")} fontWeight={'normal'}>
      <Radio value='1'>Today</Radio>
      <Radio value='2'>This week</Radio>
      <Radio value='3'>This weekend</Radio>
      </Stack>
      </RadioGroup>
    </VStack> */}
    <VStack align={'start'}>
    <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Language</Heading>
    <RadioGroup color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")} fontWeight={'normal'}>
      <Stack direction='column'>
      <Radio value='1'>English</Radio>
      <Radio value='2'>Spanish</Radio>
      </Stack>
      </RadioGroup>
    </VStack>
    <VStack p={4} borderRadius={"3xl"} border={'1px'} borderColor={useColorModeValue("neutrals.light.300", "neutrals.gray.300")} width={'100%'}>
    <FormControl display='flex' alignItems='center'>
  <FormLabel color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}  htmlFor='email-alerts' mb='0'>
  Online Events</FormLabel>
  <Spacer/>
  <Switch id='email-alerts' />
</FormControl>
    </VStack>
    <VStack width="100%">
    <Button variant="primary" width={'100%'}>Filter</Button>
    </VStack>
    </VStack>
    </Stack>
  </Box>
  );
};
