import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAddComment } from "../../hooks/comments";

const NewComment = ({ user, postId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { addComment, isLoading: commentLoading } = useAddComment({
    postId,
    uid: user?.uid,
  });

  function handleAddComment(data) {
    addComment(data.comment);
    reset();
  }

  return (
    <Box
      mx="4"
      maxW="600px"
      bg={useColorModeValue("grayBackground.main", "gray.700")}
      rounded="xl"
      p="6"
      _light={{ boxShadow: "0 2px 7px 2px #979797" }}
    >
      <form onSubmit={handleSubmit(handleAddComment)}>
        <HStack gap="6">
          <Avatar
            as={Link}
            to={`/protected/profile/${user?.uid}`}
            name={user?.displayName}
            size="md"
            src={user?.photoURL}
            _hover={{ cursor: "pointer" }}
          />
          <Input
            rounded="lg"
            p="4"
            placeholder="What is your opinion?"
            autoComplete="off"
            {...register("comment", { required: true })}
            bg={useColorModeValue("white", "chakra-body-bg")}
          />
          <Button
            type="submit"
            w="32"
            colorScheme="facebook"
            color="white"
            bgColor={useColorModeValue("facebook.500", "facebook.400")}
            isLoading={commentLoading}
            _loading={{ opacity: 0.8 }}
            spinnerPlacement="start"
          >
            Add
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default NewComment;
