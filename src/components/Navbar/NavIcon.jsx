import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavIcon = ({ Icon }) => {
  return (
    <Box
      as={Link}
      to="/protected/home"
      p="2"
      bgColor="facebook.500"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      rounded="md"
      cursor="pointer"
      _hover={{ bg: "white", color: "facebook.500" }}
      transition="all"
      transitionDuration=".2s"
    >
      <Icon size="20" />
    </Box>
  );
};

export default NavIcon;
