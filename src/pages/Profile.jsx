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
import { useParams } from "react-router-dom";
import Posts from "../components/Home/Posts";
import { useStateValue } from "../context/StateProvider";
import { useFollowUser, useUser } from "../hooks/users";

const Profile = () => {
  const { id } = useParams();
  const [{ posts, user: currentUser }] = useStateValue();
  const { user, isLoading } = useUser(id);
  const [userPosts, setUserPosts] = useState([]);
  const isFollowed = user?.followers.includes(currentUser?.uid);
  const { followUser, isLoading: followLoading } = useFollowUser({
    id,
    isFollowed,
    followerId: currentUser?.uid,
  });

  useEffect(() => {
    setUserPosts(posts?.filter((post) => post.uid == user?.id));
  }, [posts, isLoading]);

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
              name={user?.username}
              size="lg"
              src={user?.avatar}
              _hover={{ cursor: "pointer", opacity: 0.8 }}
            />
            <Flex direction="column" gap={1}>
              <Text fontSize="2xl">{user?.username}</Text>
              <Text fontSize="sm" opacity=".6" variant="">
                User since{" "}
                {!isLoading && format(parseInt(user?.createdAt), "MMMM YYY")}
              </Text>
            </Flex>
          </Flex>
          {currentUser?.uid === id ? (
            <Button
              bg={useColorModeValue("facebook.500", "gray.600")}
              color="white"
              _hover={{ bg: useColorModeValue("facebook.600", "gray.500") }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              bg={useColorModeValue("facebook.500", "facebook.400")}
              color="white"
              _hover={{ bg: useColorModeValue("facebook.600", "facebook.500") }}
              onClick={followUser}
              isLoading={followLoading}
              _loading={{ opacity: 0.8 }}
              spinnerPlacement="start"
            >
              {isFollowed ? "Un Follow" : "Follow"}
            </Button>
          )}
        </Flex>
        <Divider my="4" />
        <Flex alignItems="center" justify="space-around" gap="8">
          <Box bg="facebook.500" px="5" py="2" rounded="lg" flex="1">
            Posts: {userPosts?.length}
          </Box>
          <Box bg="facebook.500" px="5" py="2" rounded="lg" flex="1">
            Followers: {user?.followers?.length}
          </Box>
        </Flex>
      </Box>
      {/* <Box px="4" mt="10"> */}
      <Posts posts={userPosts} />
      {/* </Box> */}
    </Box>
  );
};

export default Profile;
