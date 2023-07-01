import React, { useState } from "react";
import RootLayout from "@/components/layout";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Container, Button } from "@mui/material";
import Head from "next/head";
import BusinessInfo from "@/components/business/businessInfo";
import BusinessForm from "@/components/business/businessForm";
import useSWR from "swr";
import http from "@/utils/http";

// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:3000/api/businesses");
//   const businesses = await res.json();
//   return {
//     props: {
//       businesses,
//     },
//   };
// };

function Business({ user }) {
  const { data, isLoading } = useSWR("/api/businesses", http.get);
  const [showAddBusinessForm, setShowAddBusinessForm] = useState(false);
  const businesses = data;

  const onFormClose = () => {
    setShowAddBusinessForm(false);
  };

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
          {/* A button to open the form to add a new business */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowAddBusinessForm(true);
            }}
          >
            Add Business
          </Button>
          {isLoading && <div>Loading...</div>}
          {businesses?.map((business) => (
            <BusinessInfo key={business.name} business={business} />
          ))}
        </Container>
        <BusinessForm open={showAddBusinessForm} handleClose={onFormClose} />
      </RootLayout>
    </>
  );
}

export default withAuthenticator(Business);
