import RootLayout from "@/components/layout";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Container } from "@mui/material";
import Head from "next/head";
import BusinessInfo from "@/components/business/businessInfo";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/businesses");
  const businesses = await res.json();
  return {
    props: {
      businesses,
    },
  };
};

function Business({ user, businesses }) {
  return (
    <>
      <Head>
        <title>Buiness Management</title>
        <meta name="description" content="Manage your business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RootLayout>
        <Container>
          {businesses.map((business) => (
            <BusinessInfo business={business} />
          ))}
        </Container>
      </RootLayout>
    </>
  );
}

export default withAuthenticator(Business);
