import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function Navbar() {
  const { colorMode } = useColorMode();

  return (
    <Box w="100%" textAlign="center" p={8}>
      <Center w="full">
        <Flex alignItems="center" maxW="1440px" w="full">
          <Flex alignItems="center">
            <Image
              boxSize="50px"
              src={
                colorMode == "light"
                  ? "/images/logo-1024.png"
                  : "/images/logo-1024-dark.png"
              }
              alt="logo"
            />
            <Text ml={2} textAlign="start" fontSize="xl">
              Nicolas Hasenkopf
            </Text>
          </Flex>
          <Spacer />
          <ColorModeSwitcher />
        </Flex>
      </Center>
    </Box>
  );
}

export default Navbar;
