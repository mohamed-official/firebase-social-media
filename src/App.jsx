import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { theme } from "../theme";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/Loading/Large";
import { actionTypes } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import { usePosts } from "./hooks/posts";
import Comments from "./pages/Comments";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const [{}, dispatch] = useStateValue();
  const { posts, isLoading } = usePosts();

  const getPosts = () => {
    dispatch({
      type: actionTypes.SET_POSTS,
      posts: posts,
    });
  };

  useEffect(() => {
    getPosts();
  }, [isLoading]);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/protected" element={<Layout />}>
              <Route path="/protected/home" element={<Home />} />
              <Route path="/protected/me" element={<MyProfile />} />
              <Route path="/protected/profile/:id" element={<Profile />} />
              <Route
                path="/protected/comments/:postId"
                element={<Comments />}
              />
            </Route>
          </Routes>
        </Router>
      )}
    </ChakraProvider>
  );
}

export default App;
