import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useLogout } from "../../hooks/auth";

const AccountDropDown = () => {
  const [{ user }] = useStateValue();
  const { logout, isLoading } = useLogout();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Button
        onClick={toggleColorMode}
        mr="8"
        variant="ghost"
        _light={{
          color: "white",
          _hover: { bgColor: "gray.500" },
        }}
      >
        {colorMode === "light" ? (
          <BsMoonFill size={20} />
        ) : (
          <BsFillSunFill size={20} />
        )}
      </Button>
      <Menu>
        <MenuButton>
          <Avatar
            name={user?.displayName}
            size="sm"
            src={user?.photoURL}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
          />
        </MenuButton>
        <MenuList
          border="1px solid"
          borderColor={useColorModeValue("facebook.200", "gray.600")}
        >
          <MenuItem
            as={Link}
            to="/protected/me"
            icon={<FaUserCircle size={20} />}
            color={useColorModeValue("facebook.700", "gray.300")}
            _hover={{
              bg: useColorModeValue("facebook.600", "gray.600"),
              color: "white",
            }}
            transition="all"
            transitionDuration=".1s"
          >
            Profile
          </MenuItem>
          <MenuItem
            as={Button}
            onClick={logout}
            isLoading={isLoading}
            icon={<BiLogOut size={20} />}
            color="red.500"
            mt="2"
            _hover={{ bg: "red.500", color: "white" }}
            transition="all"
            transitionDuration=".1s"
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AccountDropDown;
