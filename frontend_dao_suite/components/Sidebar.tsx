import {
  Text,
  Box, Heading, Stack, Checkbox, useColorModeValue, Flex, VStack,
  Radio, RadioGroup,Switch, FormLabel, FormControl, Button
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/images/logo.png";

export const SidebarFilters = ({ }) => {

  return (
    <Box width={'100%'} minH="100vh" p={4} bg={useColorModeValue('neutrals.light.100', 'neutrals.gray.400')} m={6} borderRadius={'3xl'}>
    <Stack spacing={4}>
    <Flex justify={'start'}>
    <Image alt="StratEx" src={logo} width={80} height={80} />
    </Flex>
    <Text fontWeight={'normal'}> Welcome, Sebas 👋</Text>
    <VStack justifyContent={'space-between'} align={'start'} gap={6}>
    <VStack align={'start'}>
      <Heading size="sm">Platform</Heading>
      <Checkbox fontWeight={'normal'}>Twitter</Checkbox>
      <Checkbox fontWeight={'normal'}>Twitch</Checkbox>
      <Checkbox fontWeight={'normal'}>Youtube</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm">Activity</Heading>
      <Checkbox fontWeight={'normal'}>Conference</Checkbox>
      <Checkbox fontWeight={'normal'}>Hackathon</Checkbox>
      <Checkbox fontWeight={'normal'}>Meetup</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm">Location</Heading>
      <Checkbox fontWeight={'normal'}>Asia</Checkbox>
      <Checkbox fontWeight={'normal'}>LatAm</Checkbox>
      <Checkbox fontWeight={'normal'}>Europe</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm">Community</Heading>
      <Checkbox fontWeight={'normal'}>Ethereum</Checkbox>
      <Checkbox fontWeight={'normal'}>Polygon</Checkbox>
      <Checkbox fontWeight={'normal'}>Bitcoin</Checkbox>
    </VStack>
    <VStack align={'start'}>
    <Heading size="sm">Date</Heading>
    <RadioGroup>
    <Stack direction='column'>
      <Radio value='1' fontWeight={'normal'}>Today</Radio>
      <Radio value='2' fontWeight={'normal'}>This week</Radio>
      <Radio value='3' fontWeight={'normal'}>This weekend</Radio>
      </Stack>
      </RadioGroup>
    </VStack>
    <VStack align={'start'}>
    <Heading size="sm">Language</Heading>
    <RadioGroup>
      <Stack direction='column'>
      <Radio value='1' fontWeight={'normal'}>English</Radio>
      <Radio value='2' fontWeight={'normal'}>Spanish</Radio>
      </Stack>
      </RadioGroup>
    </VStack>
    <VStack p={4} borderRadius={"3xl"} border={'1px'} borderColor="neutrals.light.300">
    <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='email-alerts' mb='0'>
  Only online events  </FormLabel>
  <Switch id='email-alerts' />
</FormControl>
    </VStack>
    <VStack width="100%">
    <Button variant="primary" width={'100%'}>Filter</Button>
    </VStack>
    </VStack>
    </Stack>
  </Box>
  );
};