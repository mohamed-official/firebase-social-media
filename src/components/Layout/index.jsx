import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import Navbar from "../Navbar";
import Rightbar from "../Rightbar";
import Sidebar from "../Sidebar";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (pathname.startsWith("/protected") && !user) {
      navigate("/");
    }
  }, [pathname, user]);

  return (
    <>
      <Navbar />
      <Flex
        justify="space-between"
        pt="24"
        pb="12"
        px="4"
        mx="auto"
        w="full"
        maxW="1200px"
      >
        <Rightbar />
        <Outlet />
        <Sidebar />
      </Flex>
    </>
  );
};

export default Layout;
