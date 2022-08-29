import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { auth, logout } from "../components/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import Head from "next/head";
import Navbar from "../components/Navbar";
import AppInstance from "../components/AppInstance";
import useList from "../hooks/useList";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const { list, isLoading, isError } = useList();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      if (!isLoading) {
        setLoading(false);
      }
    }
  }, [setLoading, user, router, isLoading]);

  if (!loading) {
    return (
      <div>
        <Head>
          <title>Dashboard - PM2-Monitoring</title>
        </Head>
        <Navbar />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }}>
          {list.list.map((item) => (
            <AppInstance key={item.name} instance={item} />
          ))}
        </SimpleGrid>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  } else {
    return Loading();
  }
}
