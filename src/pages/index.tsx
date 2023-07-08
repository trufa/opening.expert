import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "~/api";
import Link from "next/link";
import { Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Opening Expert</title>
        <meta
          name="description"
          content="Learn and practice your opening repertoire"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Heading as={"h1"}>Opening Expert</Heading>
          <p>
            {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          </p>
          <button
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in / Sign up"}
          </button>
        </div>
        {sessionData && <Link href={"/study"}>New study</Link>}
      </main>
    </>
  );
};

export default Home;
