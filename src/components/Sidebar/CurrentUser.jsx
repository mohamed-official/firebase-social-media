import {
  Avatar,
  Button,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";

const CurrentUser = () => {
  const [{ user }] = useStateValue();

  return (
    <Stack align="center" spacing="5" my="8">
      <Avatar
        as={Link}
        to="/protected/me"
        name={user?.displayName}
        size="lg"
        src={user?.photoURL}
        _hover={{ cursor: "pointer", opacity: 0.8 }}
      />
      <Text fontSize="xl">@{user?.displayName}</Text>
      <Button
        colorScheme={useColorModeValue("facebook", "gray")}
        _dark={{ bg: "gray.600", _hover: { bg: "gray.500" } }}
        w="full"
        as={Link}
        to="/protected/me"
      >
        Profile
      </Button>
    </Stack>
  );
};

export default CurrentUser;
