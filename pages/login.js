import {
  chakra,
  Box,
  Flex,
  Icon,
  useToast,
  Center,
  Text,
  Input,
  Button,
  FormControl,
} from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword } from "../components/firebase";
import { useEffect, useState } from "react";
import { BsLightningFill } from "react-icons";

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  });

  function login(e) {
    e.preventDefault();
    if (
      email != null &&
      email.trim().length > 0 &&
      password != null &&
      password.trim().length > 0
    ) {
      logInWithEmailAndPassword(email, password, (value) => {
        toast({
          render: () => (
            <Flex
              maxW="sm"
              w="full"
              mx="auto"
              bg="gray.800"
              shadow="md"
              rounded="lg"
              overflow="hidden"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                w={12}
                bg="red.500"
              >
                <Icon as={BsLightningFill} color="white" boxSize={6} />
              </Flex>

              <Box mx={-3} py={2} px={4}>
                <Box mx={3}>
                  <chakra.span color="red.400" fontWeight="bold">
                    Fehler
                  </chakra.span>
                  <chakra.p color="gray.200" fontSize="sm">
                    {value}
                  </chakra.p>
                </Box>
              </Box>
            </Flex>
          ),
        });
      });
    } else {
      toast({
        render: () => (
          <Flex
            maxW="sm"
            w="full"
            mx="auto"
            bg="gray.800"
            shadow="md"
            rounded="lg"
            overflow="hidden"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              w={12}
              bg="red.500"
            >
              <Icon as={BsLightningFill} color="white" boxSize={6} />
            </Flex>

            <Box mx={-3} py={2} px={4}>
              <Box mx={3}>
                <chakra.span color="red.400" fontWeight="bold">
                  Fehler
                </chakra.span>
                <chakra.p color="gray.200" fontSize="sm">
                  Bitte fülle alle Felder aus
                </chakra.p>
              </Box>
            </Box>
          </Flex>
        ),
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Login - PM2-Monitoring</title>
      </Head>
      <Navbar />
      <Center>
        <Box
          mt={10}
          w="500px"
          boxShadow={{ md: "lg" }}
          textAlign="center"
          p={8}
          borderRadius="20px"
        >
          <Text fontSize="xl">Login</Text>
          <form onSubmit={(e) => login(e)}>
            <Input
              mt={5}
              onChange={(value) => setEmail(value.target.value)}
              w="80%"
              type="email"
              placeholder="Email"
            />
            <Input
              mt={5}
              onChange={(value) => setPassword(value.target.value)}
              w="80%"
              placeholder="Passwort"
              type="password"
            />
            <Button mt={5} colorScheme="blue" type="submit">
              Anmelden
            </Button>
          </form>
        </Box>
      </Center>
    </div>
  );
}
