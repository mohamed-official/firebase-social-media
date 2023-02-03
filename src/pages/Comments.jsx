import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/Comments";
import NewComment from "../components/Comments/NewComment";
import SinglePost from "../components/Home/SinglePost";
import LoadingSpinner from "../components/Loading";
import { useStateValue } from "../context/StateProvider";

import { usePost } from "../hooks/posts";
const Comments = () => {
  const { postId } = useParams();
  const { post, isLoading } = usePost(postId);
  const [{ user }] = useStateValue();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box align="center" mt="6" mx="4">
      <SinglePost post={post} />
      <NewComment user={user} postId={postId} />
      <CommentsList id={postId} />
    </Box>
  );
};

export default Comments;
