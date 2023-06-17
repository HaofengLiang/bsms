import RootLayout from "@/components/layout";
import styles from "@/styles/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Head from "next/head";

function Business({ signOut, user }) {
  return (
    <>
      <Head>
        <title>Buiness Management</title>
        <meta name="description" content="Manage your business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RootLayout>
        <div>
          <h1>Home to you buiness management.</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </RootLayout>
    </>
  );
}

export default withAuthenticator(Business, { includeGreetings: true });
