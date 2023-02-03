import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { theme } from "../theme";
import Layout from "./components/Layout";
import Comments from "./pages/Comments";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protected" element={<Layout />}>
            <Route path="/protected/home" element={<Home />} />
            <Route path="/protected/profile/:userId" element={<Profile />} />
            <Route path="/protected/comments/:postId" element={<Comments />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
