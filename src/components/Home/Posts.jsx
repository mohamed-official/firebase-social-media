import { Box, Text } from "@chakra-ui/react";
import SinglePost from "./SinglePost";

const Posts = ({ posts }) => {
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
