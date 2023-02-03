import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useComments } from "../../hooks/comments";
import { useDeletePost, useLikePost } from "../../hooks/posts";

const PostActions = ({ id, uid, postUid, likes }) => {
  const navigate = useNavigate();
  const isLiked = likes.includes(uid);
  const { likePost, isLoading } = useLikePost({
    id,
    isLiked,
    uid,
  });
  const { comments, isLoading: commentLoading } = useComments(id);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);

  function handleDeletePost() {
    deletePost();
    navigate("/protected/home");
  }

  return (
    <Flex p="2" gap="4" justifyContent="space-between" alignItems="center">
      <Flex gap="6">
        <Flex alignItems="center" gap="2">
          <IconButton
            onClick={likePost}
            isLoading={isLoading}
            size="md"
            colorScheme={useColorModeValue("red", "white")}
            _dark={{ color: "red.600" }}
            variant="ghost"
            icon={isLiked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
          />
          {likes.length}
        </Flex>
        <Flex alignItems="center" gap="2">
          <IconButton
            as={Link}
            to={`/protected/comments/${id}`}
            isLoading={commentLoading}
            size="md"
            color="white"
            _hover={{ color: "black", bg: "white" }}
            variant="ghost"
            icon={<BiCommentDetail size={25} />}
          />
          {comments?.length}
        </Flex>
      </Flex>
      {postUid === uid && (
        <Box>
          <Flex alignItems="center" gap="2">
            <IconButton
              size="md"
              ml="auto"
              color={useColorModeValue("white", "red.500")}
              _hover={{ color: "red", bg: "white" }}
              variant="ghost"
              icon={<FaTrashAlt size={25} />}
              onClick={handleDeletePost}
              isLoading={deleteLoading}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PostActions;
