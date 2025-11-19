import React, { Suspense } from "react";
import { Layout } from "@/components/Layout";
import Term from "@/components/TermScreen/Terms";
import { Box, Skeleton } from "@mui/material";

export default function Page() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Box>
      }
    >
      <Layout>
        <Term />
      </Layout>
    </Suspense>
  );
}
