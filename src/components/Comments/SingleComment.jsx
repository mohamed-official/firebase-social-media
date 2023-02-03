import { Avatar, Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useDeleteComment } from "../../hooks/comments";
import { useUser } from "../../hooks/users";

const SingleComment = ({ comment }) => {
  const { id, uid, comment: commentText, createdAt } = comment;
  const { user, isLoading } = useUser(uid);
  const [{ user: currentUser }] = useStateValue();
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);

  if (isLoading) return;

  return (
    <Box
      p="2"
      maxW="600px"
      textAlign="left"
      bg="facebook.500"
      color="white"
      mb="10"
      mt="8"
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
      <Flex p="2" minH="50px" alignItems="center">
        <Text wordBreak="break-word" fontSize="md">
          {commentText}
        </Text>
        {uid === currentUser?.uid && (
          <IconButton
            size="md"
            ml="auto"
            color="white"
            _hover={{ color: "red", bg: "white" }}
            variant="ghost"
            icon={<FaTrashAlt size={25} />}
            onClick={deleteComment}
            isLoading={deleteLoading}
          />
        )}
      </Flex>
    </Box>
  );
};

export default SingleComment;
