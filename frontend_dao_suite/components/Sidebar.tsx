import {
  Text,
  Box, Heading, Stack, Checkbox, useColorModeValue, Flex, VStack,
  Radio, RadioGroup,Switch, FormLabel, FormControl, Button, Spacer, useColorMode
} from "@chakra-ui/react";
import Image from "next/image";
import logoLight from "../assets/images/logo.png";
import logoDark from "../assets/images/logo_dark.png";


export const SidebarFilters = ({ }) => {
    const { colorMode } = useColorMode();
    const logoSrc = colorMode === "dark" ? logoDark : logoLight;

  return (
    <Box width={'100%'} p={4} bg={useColorModeValue('neutrals.light.100', 'neutrals.gray.400')} mx={6} my={4} borderRadius={'3xl'}>
    <Stack spacing={4}>
    <Flex justify={'start'}>
    <Image alt="StratEx"
      src={logoSrc}
      width={80}
      height={80} />
    </Flex>
    <Text color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}  fontWeight={'normal'}> Welcome, Sebas 👋</Text>
    <VStack justifyContent={'space-between'} align={'start'} gap={6} >
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")} >Platform</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Twitter</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Twitch</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Youtube</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Activity</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Conference</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Hackathon</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Meetup</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Location</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Asia</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>LatAm</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Europe</Checkbox>
    </VStack>
    <VStack align={'start'}>
      <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Community</Heading>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Ethereum</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Polygon</Checkbox>
      <Checkbox fontWeight={'normal'} color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}>Bitcoin</Checkbox>
    </VStack>
    {/* <VStack align={'start'}>
    <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Date</Heading>
    <RadioGroup>
    <Stack direction='column' color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")} fontWeight={'normal'}>
      <Radio value='1'>Today</Radio>
      <Radio value='2'>This week</Radio>
      <Radio value='3'>This weekend</Radio>
      </Stack>
      </RadioGroup>
    </VStack> */}
    <VStack align={'start'}>
    <Heading size="sm" color={useColorModeValue("neutrals.gray.300", "neutrals.gray.300")}>Language</Heading>
    <RadioGroup color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")} fontWeight={'normal'}>
      <Stack direction='column'>
      <Radio value='1'>English</Radio>
      <Radio value='2'>Spanish</Radio>
      </Stack>
      </RadioGroup>
    </VStack>
    <VStack p={4} borderRadius={"3xl"} border={'1px'} borderColor={useColorModeValue("neutrals.light.300", "neutrals.gray.300")} width={'100%'}>
    <FormControl display='flex' alignItems='center'>
  <FormLabel color={useColorModeValue("neutrals.gray.200", "neutrals.gray.200")}  htmlFor='email-alerts' mb='0'>
  Online Events</FormLabel>
  <Spacer/>
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