import {
    Text,
    Box, Heading, Stack, Checkbox, useColorModeValue, Flex, VStack,
    Radio, RadioGroup,Switch, FormLabel, FormControl, Button,ButtonGroup
  } from "@chakra-ui/react";

  export const Carousel = ({ }) => {

    return (
        <>
        <Box bgGradient='linear(to-bl, brand.primary.default, brand.primary.hover)'  width="100%" py='10' px="8" borderRadius={'3xl'} my={4}>
        <Flex direction={"column"} gap="4" width="50%">
            <Heading as="h1" color={'white'}> Experience the future of decentralized event discovery.</Heading>
            <Text color={'white'} fontWeight="normal"> Connect with like-minded individuals, expand your knowledge, and seize incredible opportunities in the decentralized realm.</Text>
            <ButtonGroup variant='outline' spacing='6'>
  <Button  variant="secondary">Join now!</Button>
  <Button variant="secondaryOutline">Create an event</Button>
</ButtonGroup>
        </Flex>
        </Box>
        </>
    )
  };