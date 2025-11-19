"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "@mui/material";
import Image from "next/image";

export default function HeroSection(){
  const images = ["/heroSection/shipment.jpg","/heroSection/aeroplane.jpg"];
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };
  return (
    <section className="relative h-screen w-full" id="discover">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        arrows={true}
        showDots={false}
        containerClass="h-full"
        itemClass="h-full"
      >
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-screen">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </Carousel>

      <div className="absolute top-1/4 left-0 md:left-12 lg:left-24 z-10 max-w-2xl px-16 md:px-12">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
          Welcome to{" "}
          <span className="text-[var(--custom-red)] font-extrabold drop-shadow-lg">
            Can International
          </span>
        </h1>
        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-200 drop-shadow-md max-w-lg">
          We make international shipping easier with a smart management system that streamlines the movement of goods worldwide.
        </p>
        <p className="mt-2 text-base md:text-lg lg:text-xl text-gray-200 drop-shadow-md max-w-lg">
          One solution to simplify all your global logistics.
        </p>
        <a href="#contact">
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--custom-red)",
              mt: 4,
              px: 3,
              py: 1,
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#c60000" },
            }}
            className="shadow-lg"
          >
            Get Started
          </Button>
        </a>
      </div>
    </section>
  );
};


