import { Box, Spinner } from "@chakra-ui/react";

const LargeLoadingSpinner = () => {
  return (
    <Box
      h="100vh"
      w="100vw"
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

export default LargeLoadingSpinner;
