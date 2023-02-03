import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  // Color mode
  config,
  // Colors
  colors: {
    grayBackground: {
      main: "#b5b5b5",
    },
  },
});
