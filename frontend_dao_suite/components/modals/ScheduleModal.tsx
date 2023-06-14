import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Checkbox, CheckboxGroup,
    Button,
    Box,
    Grid,
    Stack,
    Flex,
    Text,
    Heading,
    ButtonGroup,
    useColorModeValue,
    GridItem,
  } from "@chakra-ui/react";
  import { PropsWithChildren } from "react";
  import logoLight from "../../assets/images/logo.png";
  import Image from "next/image";


  type CardDetailsProps = {
    onClose: () => void;
    onOpen: () => void;
    isOpen: boolean;
  };

export default function ScheduleModal({onClose, onOpen, isOpen} : PropsWithChildren<CardDetailsProps>) {
  return (
    <>
     <Box position="absolute" h="100vh" p={12}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent  bg={useColorModeValue("white", "neutrals.gray.400")}>
          <ModalCloseButton />
          <ModalBody>
            <Grid mt="2" templateColumns='repeat(5, 1fr)'>
             <GridItem height={"full"} width="100%" colSpan={2}>
            <VStack border="1px" borderColor={"neutrals.light.300"} borderRadius="3xl" p="4">
            <Image alt="StratEx" src={logoLight} width={180} height={180} />
            <Text  color="neutrals.gray.100" fontWeight="semibold" fontSize="sm" textAlign={"center"}>19-23 May</Text>
                <Heading   size="md"
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
              }}>EDCON 2023</Heading>
            </VStack>
             </GridItem>
             <GridItem height={"full"} width="100%" colSpan={3} p={4}>
             <Heading as='h4' fontWeight={"medium"} fontSize="lg" my={2} color="neutrals.gray.200">
                {" "}
                When would you like to receive the reminder?
              </Heading>
              <Flex>
              <CheckboxGroup colorScheme='whiteAlpha' defaultValue={['naruto', 'kakashi']}>
  <Stack spacing={[3]} direction={['column']} mt={2}>
    <Checkbox value='naruto' variant="circular" color="neutrals.gray.200">Naruto</Checkbox>
    <Checkbox value='sasuke' variant="circular" color="neutrals.gray.200">Sasuke</Checkbox>
    <Checkbox value='kakashi' variant="circular" color="neutrals.gray.200">Kakashi</Checkbox>
  </Stack>
</CheckboxGroup>
              </Flex>
             </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter pt="1">
          <ButtonGroup variant='outline' spacing='6'>
          <Button size="sm" >Cancel</Button>
          <Button size="sm" variant="primary">Save</Button>
</ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </>
  );
}