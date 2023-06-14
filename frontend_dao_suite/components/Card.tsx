import {
  Stack,
  Text,
  Image,
  Heading,
  ButtonGroup,
  Button,
  Badge,
  Icon,
  Card,
  CardBody,
  CardFooter,
  useDisclosure,
  IconButton,
  Box,
  Wrap,
  useColorModeValue,
  WrapItem,
  Link,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaYoutube,
  FaTwitch,
  FaShareAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import CardDetails from "./CardDetails";
import SheduleModal from "./modals/ScheduleModal";
import { EventData } from "../types/types";
import standardImage from "../assets/images/standard/calendar.jpg";
import { useEffect, useState } from "react";
type Props = {
  data: EventData;
};
export default function CardEvent({ data }: Props) {
  const [cardImage, setCardImage] = useState("/standard/calendar.jpg");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (data.image && data.image !== "")
      setCardImage(`https://ipfs.io/ipfs/${data.image}`);
  }, [data]);

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
    return `${formatter(date)}/${formatter(month)}/${formatter(
      fullYear
    )} ${formatter(hours)}:${formatter(minutes)}`;
  };
  const formatter = (_data: number) => {
    return _data < 10 ? `0${_data}` : `${_data}`;
  };
  const handleImageError = () => {
    setCardImage("/standard/calendar.jpg");
  };
  return (
    <>
      <Card
        maxW="sm"
        borderRadius="3xl"
        onClick={onOpen}
        bg={useColorModeValue("white", "neutrals.gray.400")}
        css={{
          cursor: "pointer",
        }}
      >
        <Image
          src={cardImage}
          alt="Event Image"
          borderTopRadius="3xl"
          maxH="200px"
          maxW="100%"
          objectFit="cover"
          onError={handleImageError}
      
        />
<Box pos="absolute" top="3" right="3">
<IconButton aria-label='Search database' borderRadius={"3xl"}  color="brand.primary.default" icon={<FaShareAlt/>} />
</Box>

        <CardBody py={3} px={5}>
          <Stack spacing="1">
            <Text color="neutrals.gray.100" fontWeight="semibold" fontSize="sm">{getData(data.start_date_timestamp)}</Text>
            <Heading
              size="md"
              as="h2"
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
              {data.name}
            </Heading>
            <Stack direction="row" align="center">
            {data.platform.toLowerCase() === "twitter" ? (
                <Icon as={FaTwitter} color="neutrals.gray.200" />
              ) : data.platform.toLowerCase() === "twitch" ? (
                <Icon as={FaTwitch} color="neutrals.gray.200" />
              ) : data.platform.toLowerCase() === "youtube" ? (
                <Icon as={FaYoutube} color="neutrals.gray.200" />
              ) : (
                <Icon as={FaMapMarkerAlt} color="neutrals.gray.200" />
              )}
              {data.is_online ? (
                <Link
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <Text fontWeight="normal" color="neutrals.gray.200">{data.platform}</Text>
                </Link>
              ) : (
                <Text fontWeight="normal" color="neutrals.gray.200">{data.location}</Text>
              )}
              
            </Stack>
            <Wrap mt={2}>
              {/* {data.tags.map((tag, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <WrapItem>
                    <Badge px={2} bg="transparent" border="1px" color="neutrals.gray.200" borderColor="neutrals.light.300" borderRadius={"xl"} fontWeight="medium" >{tag.id}</Badge>
                  </WrapItem>
                );
              })} */}
            </Wrap>
          </Stack>
        </CardBody>
        <CardFooter pt={1}>
            <Button variant="primary" colorScheme="blue" w="100%">
              Schedule
            </Button>
        </CardFooter>
      </Card>
      {isOpen && <SheduleModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />}

    </>
  );
}
