import React, { useContext, useState } from "react";
import {
  Text,
  Box,
  Heading,
  Stack,
  Checkbox,
  useColorModeValue,
  Flex,
  VStack,
  Radio,
  RadioGroup,
  Switch,
  FormLabel,
  FormControl,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import { EventsContext } from "../context/EventsContext";
import {
  getUnixTimestampsForThisWeek,
  getUnixTimestampsForToday,
  getUnixTimestampsForWeekend,
} from "../helpers/DateData";
import { AddTagOnEvent, CreateEvent, FilterEventsBetweenDates, Platform } from "../helpers/PolybaseData";
import { Tag } from "../types/types";
import { nanoid } from "nanoid";
import moment from "moment";
export const SidebarFilters = ({}) => {
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
    <Box
      width={"100%"}
      minH="100vh"
      p={4}
      bg={useColorModeValue("neutrals.light.100", "neutrals.gray.400")}
      m={6}
      borderRadius={"3xl"}
    >
      <Stack spacing={4}>
        <Flex justify={"start"}>
          <Image alt="StratEx" src={logo} width={80} height={80} />
        </Flex>
        <Text fontWeight={"normal"}> Welcome, Sebas 👋</Text>
        <VStack justifyContent={"space-between"} align={"start"} gap={6}>
          <VStack align={"start"}>
            <Heading size="sm">Platform</Heading>
            <Checkbox fontWeight={"normal"}>Twitter</Checkbox>
            <Checkbox fontWeight={"normal"}>Twitch</Checkbox>
            <Checkbox fontWeight={"normal"}>Youtube</Checkbox>
          </VStack>
          <VStack align={"start"}>
            <Heading size="sm">Activity</Heading>
            <Checkbox fontWeight={"normal"}>Conference</Checkbox>
            <Checkbox fontWeight={"normal"}>Hackathon</Checkbox>
            <Checkbox fontWeight={"normal"}>Meetup</Checkbox>
          </VStack>
          <VStack align={"start"}>
            <Heading size="sm">Location</Heading>
            <Checkbox fontWeight={"normal"}>Asia</Checkbox>
            <Checkbox fontWeight={"normal"}>LatAm</Checkbox>
            <Checkbox fontWeight={"normal"}>Europe</Checkbox>
          </VStack>
          <VStack align={"start"}>
            <Heading size="sm">Community</Heading>
            <Checkbox fontWeight={"normal"}>Ethereum</Checkbox>
            <Checkbox fontWeight={"normal"}>Polygon</Checkbox>
            <Checkbox fontWeight={"normal"}>Bitcoin</Checkbox>
          </VStack>
          <VStack align={"start"}>
            <Heading size="sm">Date</Heading>
            <RadioGroup onChange={handleRadioChange} value={dateFilter}>
              <Stack direction="column">
                <Radio value="1" fontWeight={"normal"}>
                  Today
                </Radio>
                <Radio value="2" fontWeight={"normal"}>
                  This week
                </Radio>
                <Radio value="3" fontWeight={"normal"}>
                  This weekend
                </Radio>
              </Stack>
            </RadioGroup>
          </VStack>
          <VStack align={"start"}>
            <Heading size="sm">Language</Heading>
            <RadioGroup>
              <Stack direction="column">
                <Radio value="1" fontWeight={"normal"}>
                  English
                </Radio>
                <Radio value="2" fontWeight={"normal"}>
                  Spanish
                </Radio>
              </Stack>
            </RadioGroup>
          </VStack>
          <VStack
            p={4}
            borderRadius={"3xl"}
            border={"1px"}
            borderColor="neutrals.light.300"
          >
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Only online events{" "}
              </FormLabel>
              <Switch id="email-alerts" />
            </FormControl>
          </VStack>
          <VStack width="100%">
            <Button variant="primary" width={"100%"} onClick={onFilter}>
              Filter
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Box>
  );
};
