import Head from "next/head";
import Login from "./login";

export default function Home() {
  return (
    <div>
      <Head>
        <title>PM2-Monitoring</title>
      </Head>
      <Login />
    </div>
  );
}
