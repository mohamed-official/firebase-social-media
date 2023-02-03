import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useLogout } from "../../hooks/auth";

const AccountDropDown = () => {
  const [{ user }] = useStateValue();
  const { logout, isLoading } = useLogout();

  return (
    <Box>
      <Menu>
        <MenuButton>
          <Avatar
            name={user?.displayName}
            size="sm"
            src={user?.photoURL}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
          />
        </MenuButton>
        <MenuList border="1px solid" borderColor="facebook.200">
          <MenuItem
            as={Link}
            to="/protected/me"
            icon={<FaUserCircle size={20} />}
            color="facebook.700"
            _hover={{ bg: "facebook.600", color: "white" }}
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
