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
  Box,
  Wrap,
  WrapItem,
  Link,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaYoutube,
  FaTwitch,
  FaMeetup,
  FaPeopleArrows,
} from "react-icons/fa";
import CardDetails from "./CardDetails";
import { ItemData } from "../helpers/PolybaseData";
import standardImage from "../assets/images/standard/calendar.jpg";
import { useEffect, useState } from "react";
type Props = {
  data: ItemData;
};
export default function CardEvent({ data }: Props) {
  const [cardImage, setCardImage] = useState("/standard/calendar.jpg");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (data.image && data.image !== "")
      setCardImage(`https://ipfs.io/ipfs/${data.image}`);
    console.log(data.tags);
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
        borderRadius="2xl"
        mt="2"
        onClick={onOpen}
        css={{
          cursor: "pointer",
        }}
      >
        <Image
          src={cardImage}
          alt="Event Image"
          borderTopRadius="2xl"
          maxH="200px"
          maxW="100%"
          objectFit="cover"
          onError={handleImageError}
        />
        <CardBody>
          <Stack mt="2" spacing="1">
            <Text>{getData(data.start_date_timestamp)}</Text>
            <Heading
              height="2.5em"
              size="md"
              as="h2"
              maxH="3em"
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
              {data.is_online ? (
                <Link
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <Text style={{ color: "gray" }}>{data.platform}</Text>
                </Link>
              ) : (
                <Text>{data.location}</Text>
              )}
              {data.platform.toLowerCase() === "twitter" ? (
                <Icon as={FaTwitter} />
              ) : data.platform.toLowerCase() === "twitch" ? (
                <Icon as={FaTwitch} />
              ) : data.platform.toLowerCase() === "youtube" ? (
                <Icon as={FaYoutube} />
              ) : (
                <Icon as={FaPeopleArrows} />
              )}
            </Stack>
            <Wrap>
              {data.tags.map((tag, index) => {
                return (
                  <WrapItem>
                    <Badge variant="outline">{tag.id}</Badge>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2" width="100%">
            <Button variant="solid" colorScheme="blue" w="100%">
              Schedule
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Share
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {isOpen && (
        <CardDetails onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
      )}{" "}
    </>
  );
}
