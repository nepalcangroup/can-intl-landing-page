"use client";

import { Suspense } from "react";
import PageNotFoundScreen from "@/screens/PageNotFoundScreen";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageNotFoundScreen />
    </Suspense>
  );
}
