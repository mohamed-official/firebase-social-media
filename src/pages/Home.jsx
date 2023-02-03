import { Box } from "@chakra-ui/react";
import NewPost from "../components/Home/NewPost";
import Posts from "../components/Home/Posts";
import { useStateValue } from "../context/StateProvider";

const Home = () => {
  const [{ user }] = useStateValue();
  const [{ posts }] = useStateValue();

  return (
    <Box align="center" mt="6">
      <NewPost user={user} />
      <Posts posts={posts} />
    </Box>
  );
};

export default Home;
