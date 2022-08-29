import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    bg: "#1A202C",
    secondaryLight: "#A0AEC0",
    secondaryMedium: "#718096",
    secondaryDark: "#2A4365",
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 700,
      },
    },
  },
});

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
