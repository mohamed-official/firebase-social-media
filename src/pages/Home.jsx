import { Box } from "@chakra-ui/react";
import NewPost from "../components/Home/NewPost";
import Posts from "../components/Home/Posts";
import LoadingSpinner from "../components/Loading";
import { useAuth } from "../hooks/auth";
import { usePosts } from "../hooks/posts";

const Home = () => {
  const { user, authLoading } = useAuth();
  const { posts, isLoading: postsLoading } = usePosts();

  if (postsLoading) return <LoadingSpinner />;

  return (
    <Box align="center" mt="6">
      <NewPost user={user} authLoading={authLoading} />
      <Posts posts={posts} />
    </Box>
  );
};

export default Home;
