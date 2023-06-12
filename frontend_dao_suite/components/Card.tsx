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
  useDisclosure
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import CardDetails from "./CardDetails";

export default function CardEvent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card maxW="sm" borderRadius="2xl" mt="2" onClick={onOpen}>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderTopRadius="2xl"
        />
        <CardBody>
          <Stack mt="2" spacing="1">
            <Text>19-23 May</Text>
            <Heading size="md">EDCON 2023</Heading>
            <Stack direction="row" align="center">
              <Icon as={FaInstagram} />
              <Text>Podgorica, Montenegro</Text>
            </Stack>
            <Stack direction="row">
              <Badge variant="outline" colorScheme="green">
                Conference
              </Badge>
              <Badge variant="solid" colorScheme="green">
                Europe{" "}
              </Badge>
              <Badge variant="subtle" colorScheme="green">
                Ethereum
              </Badge>
            </Stack>
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

      {isOpen && <CardDetails onClose={onClose}  onOpen={onOpen} isOpen={isOpen}/>}    </>
  );
}
