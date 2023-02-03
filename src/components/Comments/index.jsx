import { Box } from "@chakra-ui/react";
import LoadingSpinner from "../../components/Loading";
import { useComments } from "../../hooks/comments";
import SingleComment from "./SingleComment";

const Comments = ({ id }) => {
  const { comments, isLoading } = useComments(id);

  if (isLoading) return <LoadingSpinner />;

  return comments.map((comment) => (
    <Box key={comment?.id}>
      <SingleComment comment={comment} />
    </Box>
  ));
};

export default Comments;
