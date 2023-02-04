import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useDeleteComment } from "../../hooks/comments";
import { useUser } from "../../hooks/users";
import LoadingSpinner from "../Loading";

const SingleComment = ({ comment }) => {
  const { id, uid, comment: commentText, createdAt } = comment;
  const { user, isLoading } = useUser(uid);
  const [{ user: currentUser }] = useStateValue();
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);

  useEffect(() => {
    function loading() {
      if (isLoading) return <LoadingSpinner />;
      loading();
    }
  }, []);

  return (
    <Box
      p="2"
      maxW="600px"
      textAlign="left"
      bg={useColorModeValue("facebook.500", "gray.700")}
      color="white"
      mb="10"
      mt="8"
      rounded="lg"
    >
      <Flex
        alignItems="center"
        borderBottom="2px solid"
        borderBottomColor={useColorModeValue("facebook.100", "gray.500")}
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
            color={useColorModeValue("white", "red.500")}
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
