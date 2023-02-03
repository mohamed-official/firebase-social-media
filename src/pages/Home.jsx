import { Box } from "@chakra-ui/react";
import NewPost from "../components/Home/NewPost";
import Posts from "../components/Home/Posts";
import { useStateValue } from "../context/StateProvider";
import { usePosts } from "../hooks/posts";

const Home = () => {
  const [{ user }] = useStateValue();
  const { posts, isLoading } = usePosts();

  return (
    <Box align="center" mt="6">
      <NewPost user={user} />
      <Posts posts={posts} isLoading={isLoading} />
    </Box>
  );
};

export default Home;
