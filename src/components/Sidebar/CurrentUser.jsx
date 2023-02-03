import { Avatar, Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import LoadingSpinner from "../Loading";

const CurrentUser = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Stack align="center" spacing="5" my="8">
      <Avatar
        as={Link}
        to={`/protected/profile/${user?.id}`}
        name={user?.username}
        size="lg"
        src={user?.avatar}
        _hover={{ cursor: "pointer", opacity: 0.8 }}
      />
      <Text fontSize="xl">@{user?.username}</Text>
      <Button
        colorScheme="facebook"
        w="full"
        as={Link}
        to={`/protected/profile/${user?.id}`}
      >
        Profile
      </Button>
    </Stack>
  );
};

export default CurrentUser;
