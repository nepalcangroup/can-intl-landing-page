"use client";

import React from "react";
import { Layout } from "@/components/Layout";
import { NarrowLayout } from "@/components/NarrowLayout";
import LottieAnimationWrapper from "@/components/LottieAnimationWrapper ";
import pageMissing from "../assets/page-missing.json";
import Link from "next/link";

const PageNotFoundScreen = () => {
  return (
    <Layout>
      <NarrowLayout>
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <LottieAnimationWrapper
            animationData={pageMissing}
            style={{ width: 400, height: 250 }}
            loop={true}
          />

          <div>
            <div>The page you're looking for doesn't exist </div>
            <p className="text-center text-blue-500">
              <Link href="/">Go Home</Link>
            </p>
          </div>
        </div>
      </NarrowLayout>
    </Layout>
  );
};

export default PageNotFoundScreen;
