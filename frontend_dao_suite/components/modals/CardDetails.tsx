import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  VStack,
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
    <Box position="absolute" h="100vh" p={12}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white", "neutrals.gray.400")}>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderTopRadius="lg"
          />
          <ModalCloseButton />
          <ModalBody>
            <Stack mt="2" spacing="1">
              <HStack justifyContent={'space-between'}>
              <VStack align={"start"}>
                <Text  color="neutrals.gray.100" fontWeight="semibold" fontSize="sm">19-23 May</Text>
                <Heading   size="md"
              as="h2"
           
              color="brand.primary.default"
              textTransform="capitalize"
              overflow="hidden"
              textOverflow="ellipsis"
              css={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}>EDCON 2023</Heading>
              </VStack>
              <VStack align={"end"}>
       
               <HStack>
                  <Avatar
                    name="Dan Abrahmov"
                    size="xs"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Text color="neutrals.gray.100" fontWeight="normal" fontSize="md">Anais Svelty</Text>
                </HStack>
              <Button variant="primary" size='sm'>
              Schedule
            </Button>
              </VStack>
              </HStack>
              <Stack direction="row" align="center">
                <Icon as={FaInstagram} color="neutrals.gray.200" />
                <Text fontWeight="normal" color="neutrals.gray.200">Podgorica, Montenegro</Text>
              </Stack>

              <Text my={2} color="neutrals.gray.200">
                {" "}
                Lorem ipsum dolor sit amet. Et corporis quisquam eum adipisci
                impedit quo eius nisi est aspernatur vel veniam velit qui
                numquam totam. Vel debitis sint ut culpa cupiditate a dolores
                voluptates ut vero voluptatem non rerum aliquid qui sapiente
                possimus. Eum natus voluptates hic galisum architecto et nobis
                incidunt ut odio ipsum qui repudiandae voluptatem.
              </Text>


              <Stack direction="row" py={2}>
                <Badge px={2} bg="transparent" border="1px" color="neutrals.gray.200" borderColor="neutrals.light.300" borderRadius={"xl"} fontWeight="medium" >
                  Conference
                </Badge>
                <Badge px={2} bg="transparent" border="1px" color="neutrals.gray.200" borderColor="neutrals.light.300" borderRadius={"xl"} fontWeight="medium" >
                  Europe{" "}
                </Badge>
                <Badge px={2} bg="transparent" border="1px" color="neutrals.gray.200" borderColor="neutrals.light.300" borderRadius={"xl"} fontWeight="medium" >
                  Ethereum
                </Badge>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
