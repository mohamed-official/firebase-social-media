import { Box, Text } from "@chakra-ui/react";
import CurrentUser from "./CurrentUser";

const Sidebar = () => {
  return (
    <Box
      px="6"
      h="100vh"
      w="30%"
      borderLeft="1px solid"
      borderLeftColor="facebook.200"
      pos="sticky"
      top="16"
      display={{ base: "none", md: "block" }}
    >
      <CurrentUser />
      <Box align="center">
        <Box as="ul" borderTop="2px solid" borderTopColor="facebook.300">
          <Text fontSize="2xl">Online Users</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
