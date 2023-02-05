import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Posts from "../components/Home/Posts";
import LargeLoadingSpinner from "../components/Loading/Large";
import { useStateValue } from "../context/StateProvider";

const MyProfile = () => {
  const [{ user, posts }] = useStateValue();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setUserPosts(posts?.filter((post) => post.uid == user.uid));
  }, [posts]);

  if (!user) return <LargeLoadingSpinner />;

  return (
    <Box align="center" flex="1">
      <Box
        mx="4"
        maxW={{ base: "600px", lg: "700px" }}
        bg={useColorModeValue("grayBackground.main", "chakra-body-bg")}
        p="8"
        rounded="lg"
      >
        <Flex alignItems="center" justify="space-between" gap="8">
          <Flex alignItems="center" gap="8" textAlign="left">
            <Avatar
              name={user?.displayName}
              size="lg"
              src={user?.photoURL}
              _hover={{ cursor: "pointer", opacity: 0.8 }}
            />
            <Flex direction="column" gap={1}>
              <Text fontSize="2xl">{user?.displayName}</Text>
              <Text fontSize="sm" opacity=".6" variant="">
                User since {format(parseInt(user?.createdAt), "MMMM YYY")}
              </Text>
            </Flex>
          </Flex>
          <Button
            bg={useColorModeValue("facebook.500", "gray.600")}
            color="white"
            _hover={{ bg: useColorModeValue("facebook.600", "gray.500") }}
          >
            Edit Profile
          </Button>
        </Flex>
        <Divider my="4" />
        <Flex alignItems="center" justify="space-around" gap="8">
          <Box bg="facebook.500" px="5" py="2" rounded="lg" flex="1">
            Posts: {userPosts?.length}
          </Box>
          <Box bg="facebook.500" px="5" py="2" rounded="lg" flex="1">
            Followers: {user?.followers ? user?.followers.length : 0}
          </Box>
        </Flex>
      </Box>
      {/* <Box px="4" mt="10"> */}
      <Posts posts={userPosts} />
      {/* </Box> */}
    </Box>
  );
};

export default MyProfile;
