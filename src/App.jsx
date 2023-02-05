import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { useEffect } from "react";
import { theme } from "../theme";
import LoadingSpinner from "./components/Loading/Large";
import { actionTypes } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import { usePosts } from "./hooks/posts";
import Router from "./Routes";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const { posts, isLoading } = usePosts();

  const getPosts = () => {
    dispatch({
      type: actionTypes.SET_POSTS,
      posts: posts,
    });
  };

  useEffect(() => {
    getPosts();
  }, [isLoading, user]);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {isLoading && !user ? <LoadingSpinner /> : <Router />}
    </ChakraProvider>
  );
}

export default App;
