import { Box, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      h="100%"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color="facebook.500"
        size="xl"
      />
    </Box>
  );
};

export default LoadingSpinner;
