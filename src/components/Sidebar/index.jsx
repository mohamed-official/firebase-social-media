import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import { memo } from "react";
import { stories } from "../../data/stories";

const Sidebar = () => {
  return (
    <Box h="100vh" pos="sticky" display={{ base: "none", md: "block" }}>
      {/* <CurrentUser />
      <OnlineUsers /> */}
      <Box p="4" w="64" bg="chakra-body-bg" rounded="lg">
        <Text>Stories</Text>
        <Divider my="3" />
        {stories.map((story) => (
          <div key={Math.random()}>
            <Flex alignItems="center" gap="8">
              <Avatar
                size="md"
                src={story.image}
                _hover={{ cursor: "pointer", opacity: 0.8 }}
              />
              <Flex direction="column" gap={1}>
                <Text fontSize="lg">{story.username}</Text>
                <Text fontSize="sm" color="gray.500">
                  {story.time}
                </Text>
              </Flex>
            </Flex>
            <Divider my="3" />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default memo(Sidebar);
