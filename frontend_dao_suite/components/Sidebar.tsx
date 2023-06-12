import {
  Text,
  Box, Heading, Stack, Checkbox, useColorModeValue
} from "@chakra-ui/react";

export const SidebarFilters = ({ }) => {

  return (
    <Box width={'100%'} minH="100vh" p={4} bg={useColorModeValue('neutrals.light.100', 'neutrals.gray.400')}>
    <Stack spacing={4}>
      <Heading size="md">Filtros</Heading>
      <Checkbox checked>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <Checkbox>Option 3</Checkbox>
      <Text fontSize="sm" color="gray.500">
        Otros filtros...
      </Text>
    </Stack>
  </Box>
  );
};