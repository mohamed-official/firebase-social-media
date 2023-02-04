import { Box } from "@chakra-ui/react";
import { memo } from "react";

const Rightbar = () => {
  return (
    <Box
      px="6"
      h="100vh"
      bg="chakra-body-bg"
      pos="sticky"
      top="16"
      display={{ base: "none", lg: "block" }}
    >
      {/* <CurrentUser />
      <OnlineUsers /> */}
      <Box>rightbar</Box>
    </Box>
  );
};

export default memo(Rightbar);
