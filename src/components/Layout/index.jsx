import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import LargeLoadingSpinner from "../Loading/Large";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate("/");
    }
  }, [pathname, user, isLoading]);

  if (isLoading) return <LargeLoadingSpinner />;

  return (
    <>
      <Navbar />
      <Flex pt="16" pb="12" mx="auto" w="full" maxW="1200px">
        <Box w={{ base: "100%", md: "70%" }}>
          <Outlet />
        </Box>
        <Sidebar />
      </Flex>
    </>
  );
};

export default Layout;
