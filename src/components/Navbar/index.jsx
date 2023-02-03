import { Box, Flex, Text } from "@chakra-ui/react";
import { BiHomeAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";
import AccountDropDown from "./AccountDropDown";
import NavIcon from "./NavIcon";

const Navbar = () => {
  return (
    <Box
      bgColor="facebook.500"
      pos="fixed"
      w="full"
      zIndex="3"
      display="flex"
      justify="center"
      alignItems="center"
      h="14"
      px="4"
      py="2"
    >
      <Flex
        mx="auto"
        justify="space-between"
        alignItems="center"
        w="full"
        maxW="1200px"
      >
        <Box>
          <Text
            as={Link}
            to="/protected/home"
            color="white"
            fontSize={{ base: "md", sm: "lg" }}
            fontWeight="bold"
            letterSpacing="wide"
            _hover={{ opacity: 0.7 }}
            transition="all"
            transitionDuration=".1s"
          >
            FakeBook
          </Text>
        </Box>
        <Box display="flex" gap={{ base: "0", lg: "10" }}>
          <NavIcon Icon={BiHomeAlt} />
          <NavIcon Icon={FaUsers} />
          <NavIcon Icon={MdOutlineNotificationsNone} />
        </Box>
        <AccountDropDown />
      </Flex>
    </Box>
  );
};

export default Navbar;
