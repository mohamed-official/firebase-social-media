import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useUser } from "../../hooks/users";
import PostActions from "./PostActions";

const SinglePost = ({ post }) => {
  const { id, uid, postText, createdAt, likes } = post;
  const { user, isLoading } = useUser(uid);
  const { user: currentUser, isLoading: authLoading } = useAuth();

  if (isLoading) return;

  return (
    <Box
      p="2"
      maxW="600px"
      textAlign="left"
      bg="facebook.500"
      color="white"
      mb="10"
      rounded="lg"
    >
      <Flex
        alignItems="center"
        borderBottom="2px solid"
        borderBottomColor="facebook.100"
        p="3"
      >
        <Avatar
          as={Link}
          to={`/protected/profile/${uid}`}
          name={user?.username}
          size="md"
          src={user?.avatar}
          _hover={{ cursor: "pointer" }}
        />
        <Box ml="4">
          <Button
            as={Link}
            to={`/protected/profile/${uid}`}
            colorScheme="white"
            variant="link"
          >
            {user?.username}
          </Button>
          <Text fontSize="sm" color="whiteAlpha.600">
            {formatDistanceToNow(createdAt)}
          </Text>
        </Box>
      </Flex>
      <Flex p="2" minH="100px" alignItems="center">
        <Text wordBreak="break-word" fontSize="md">
          {postText}
        </Text>
      </Flex>
      <PostActions
        id={id}
        uid={currentUser?.id}
        postUid={uid}
        likes={likes}
        authLoading={authLoading}
      />
    </Box>
  );
};

export default SinglePost;
