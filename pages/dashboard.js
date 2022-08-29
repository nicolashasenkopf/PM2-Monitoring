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
import { async } from "@firebase/util";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      let interval = setInterval(async () => {
        const res = await fetch("/api/list");
        const data = await res.json();
        setList(data.list);
      }, 3000);
      setLoading(false);

      return () => clearInterval(interval);
    }
  }, [setLoading, user, router, setList]);

  if (!loading) {
    return (
      <div>
        <Head>
          <title>Dashboard - PM2-Monitoring</title>
        </Head>
        <Navbar />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }}>
          {list.map((item) => (
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
