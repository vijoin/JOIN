import {
    Text,
    Box, Heading, Stack, Checkbox, useColorModeValue, Flex, VStack,
    Radio, RadioGroup,Switch, FormLabel, FormControl, Button,ButtonGroup, HStack,Avatar
  } from "@chakra-ui/react";
  import Image from "next/image";
  import logo from "../assets/images/logo.png";

  export const HighlightEvents = ({ }) => {

    return (
        <>
        <Box width="100%" py='6' px="4" borderRadius={'3xl'} my={4} bg={useColorModeValue('neutrals.light.100', 'neutrals.gray.400')}>
        <Heading as="h3" fontSize={'xl'} fontWeight="medium" mb={4} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")} >My events</Heading>
            <Flex direction={"column"} mb={2} width="100%">
           <HStack mb={4} align={'center'} justifyContent={"space-between"}>
           <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <VStack align={"start"} gap={0} >
            <Text color={useColorModeValue("neutrals.gray.300", "neutrals.gray.200")} >HackFS 2023</Text>
            <Text fontWeight={"normal"} color={useColorModeValue("neutrals.gray.100", "neutrals.gray.300")} fontSize={"sm"}>230 assistants</Text>
           </VStack>
           <Button variant="outline"size={'sm'}>Details</Button>
           </HStack>
           <HStack mb={4} align={'center'} justifyContent={"space-between"}>
           <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <VStack align={"start"} gap={0} >
            <Text color={useColorModeValue("neutrals.gray.300", "neutrals.gray.200")} >HackFS 2023</Text>
            <Text fontWeight={"normal"} color={useColorModeValue("neutrals.gray.100", "neutrals.gray.300")} fontSize={"sm"}>230 assistants</Text>
           </VStack>
           <Button variant="outline"size={'sm'}>Details</Button>
           </HStack>
           <HStack mb={4} align={'center'} justifyContent={"space-between"}>
           <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <VStack align={"start"} gap={0} >
            <Text color={useColorModeValue("neutrals.gray.300", "neutrals.gray.200")} >HackFS 2023</Text>
            <Text fontWeight={"normal"} color={useColorModeValue("neutrals.gray.100", "neutrals.gray.300")} fontSize={"sm"}>230 assistants</Text>
           </VStack>
           <Button variant="outline"size={'sm'}>Details</Button>
           </HStack>
           
            </Flex>
        <Button variant='primaryOutline'width="100%">View all</Button>
        </Box>
        </>
    )
}