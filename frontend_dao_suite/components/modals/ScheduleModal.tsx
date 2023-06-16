import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Checkbox,
  CheckboxGroup,
  Button,
  Box,
  Grid,
  Image,
  Stack,
  Flex,
  Text,
  Heading,
  ButtonGroup,
  useColorModeValue,
  GridItem,
} from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useState } from "react";
import logoLight from "../../assets/images/logo.png";
import { CollectionRecordResponse } from "@polybase/client/dist/Record";
import { AddReminder } from "../../helpers/PolybaseData";
import { nanoid } from "nanoid";
import moment, { Moment } from 'moment';

export type CardDetailsProps = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
  event: CollectionRecordResponse<any, any>;
};

export default function ScheduleModal({
  onClose,
  onOpen,
  isOpen,
  event,
}: PropsWithChildren<CardDetailsProps>) {
  const [cardImage, setCardImage] = useState("/standard/calendar.jpg");
  const [thirty, setThirty] = useState(true);
  const [fifteen, setFifteen] = useState(false);
  const [five, setFive] = useState(false);

  useEffect(() => {
    if (event?.data.image && event?.data.image !== "")
      setCardImage(`https://ipfs.io/ipfs/${event?.data.image}`);
  }, []);
  const handleImageError = () => {
    setCardImage("/nocover.png");
  };
  const onImageLoad = () => {
    console.log("image loaded");
  };
  const getData = (unix: number) => {
    const timestampInMilliseconds = unix * 1000;
    const date = new Date(timestampInMilliseconds);
    const formattedData = getDateFormat(date);
    return formattedData;
  };
  const getDateFormat = (_date: Date) => {
    const date = _date.getDate();
    const month = _date.getMonth() + 1;
    const fullYear = _date.getFullYear();
    const hours = _date.getHours();
    const minutes = _date.getMinutes();
    return `${formatter(month)}/${formatter(date)}/${formatter(
      fullYear
    )} ${formatter(hours)}:${formatter(minutes)}`;
  };
  const formatter = (_data: number) => {
    return _data < 10 ? `0${_data}` : `${_data}`;
  };
  const onSetReminder = async () => {
    try {
      const reminderDate = subtractMinutesFromUnixTime(event?.data.start_date_timestamp, 15);
      const reminder = await AddReminder(nanoid(),  event.data.id, reminderDate);
      console.log(reminder);
    } catch (error) {
      console.log(error);
    }
  }
  function subtractMinutesFromUnixTime(unixTime: number, minutes: number): number {
    const newTime = moment.unix(unixTime).subtract(minutes, 'minutes').unix();
    return newTime;
  } 
  return (
    <>
      <Box position="absolute" h="100vh" p={12}>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg={useColorModeValue("white", "neutrals.gray.400")}>
            <ModalCloseButton />
            <ModalBody>
              <Grid mt="2" templateColumns="repeat(5, 1fr)">
                <GridItem height={"full"} width="100%" colSpan={2}>
                  <VStack
                    border="1px"
                    borderColor={"neutrals.light.300"}
                    borderRadius="3xl"
                    p="4"
                  >
                    <Image
                      alt="Event Image"
                      src={cardImage}
                      maxH={120}
                      maxW={120}
                      width={120}
                      height={120}
                      onError={handleImageError}
                      onLoad={onImageLoad}
                    />
                    <Text
                      color="neutrals.gray.100"
                      fontWeight="semibold"
                      fontSize="sm"
                      textAlign={"center"}
                    >
                      {getData(event?.data.start_date_timestamp)}
                    </Text>
                    <Heading
                      size="md"
                      as="h3"
                      textAlign={"center"}
                      color="brand.primary.default"
                      textTransform="capitalize"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      css={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {event.data.name}
                    </Heading>
                  </VStack>
                </GridItem>
                <GridItem height={"full"} width="100%" colSpan={3} p={4}>
                  <Heading
                    as="h4"
                    fontWeight={"medium"}
                    fontSize="lg"
                    my={2}
                    color="neutrals.gray.200"
                  >
                    {" "}
                    When would you like to receive the reminder?
                  </Heading>
                  <Flex>
                    <CheckboxGroup
                      colorScheme="whiteAlpha"
                      defaultValue={["naruto", "kakashi"]}
                    >
                      <Stack spacing={[3]} direction={["column"]} mt={2}>
                        <Checkbox
                          variant="circular"
                          color="neutrals.gray.200"
                          isChecked={thirty}
                          onChange={() => setThirty(!thirty)}
                        >
                          30 minutes before
                        </Checkbox>
                        <Checkbox
                          variant="circular"
                          color="neutrals.gray.200"
                          isChecked={fifteen}
                          onChange={() => setFifteen(!fifteen)}
                        >
                          15 minutes before
                        </Checkbox>
                        <Checkbox
                          variant="circular"
                          color="neutrals.gray.200"
                          isChecked={five}
                          onChange={() => setFive(!five)}
                        >
                          5 minutes before
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </Flex>
                </GridItem>
              </Grid>
            </ModalBody>
            <ModalFooter pt="1">
              <ButtonGroup variant="outline" spacing="6">
                <Button size="sm">Cancel</Button>
                <Button size="sm" variant="primary" onClick={onSetReminder}>
                  Save
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
