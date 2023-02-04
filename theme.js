import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const config = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  // Color mode
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "gray.700")(props),
      },
    }),
  },
  fonts: {
    body: "'Source Sans Pro', sans-serif",
  },
  // Colors
  colors: {
    grayBackground: {
      main: "#b5b5b5",
    },
  },
});
