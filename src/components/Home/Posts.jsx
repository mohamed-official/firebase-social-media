import { Box, Text } from "@chakra-ui/react";
import LoadingSpinner from "../Loading";
import SinglePost from "./SinglePost";

const Posts = ({ posts, isLoading }) => {
  if (isLoading)
    return (
      <Box mt="10">
        <LoadingSpinner />
      </Box>
    );
  return (
    <Box px="4" mt="10">
      {posts?.length === 0 ? (
        <Text align="center" fontSize="xl" fontWeight="bold">
          There're no posts here yet. kind of weird!
        </Text>
      ) : (
        posts?.map((post) => <SinglePost key={post?.id} post={post} />)
      )}
    </Box>
  );
};

export default Posts;
