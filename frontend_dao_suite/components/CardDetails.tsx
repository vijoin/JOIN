import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Stack,
  Text,
  Image,
  Heading,
  ButtonGroup,
  Button,
  Badge,
  Icon,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { PropsWithChildren } from "react";

type CardDetailsProps = {
    onClose: () => void;
    onOpen: () => void;
    isOpen: boolean;
  };

export default function CardDetails({onClose, onOpen, isOpen} : PropsWithChildren<CardDetailsProps>) {
  return (
    <Box position="relative" h="100vh" p={12}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderTopRadius="lg"
          />
          <ModalCloseButton />
          <ModalBody>
            <Stack mt="2" spacing="1">
              <HStack justifyContent={"space-between"}>
                <Text>19-23 May</Text>
                <HStack>
                  <Avatar
                    name="Dan Abrahmov"
                    size="xs"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Text>Anais Svelty</Text>
                </HStack>
              </HStack>

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
              <Text>
                {" "}
                Lorem ipsum dolor sit amet. Et corporis quisquam eum adipisci
                impedit quo eius nisi est aspernatur vel veniam velit qui
                numquam totam. Vel debitis sint ut culpa cupiditate a dolores
                voluptates ut vero voluptatem non rerum aliquid qui sapiente
                possimus. Eum natus voluptates hic galisum architecto et nobis
                incidunt ut odio ipsum qui repudiandae voluptatem.
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing="2" width="100%">
              <Button
                variant="solid"
                onClick={onClose}
                colorScheme="blue"
                w="100%"
              >
                Schedule
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Share
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
