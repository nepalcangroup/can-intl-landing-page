"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { Phone, Home, Email } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { clearPricingData } from "@/store/pricingSlice";

export default function p() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const pricingData = useSelector((state) => state.pricing);

  const pricingMessage = pricingData?.contactMessage || "";
  const destination = pricingData?.destination || null;

  const [formMessage, setFormMessage] = useState({ text: "", type: "" });

  const LIVE_URL = "https://app.international.nepalcan.com";
  const DEMO_URL = "https://can-intl.onrender.com";
  const LOCAL_URL = "http://localhost:5002";

  let BASE_URL;
  if (process.env.NODE_ENV === "development") {
    BASE_URL = LOCAL_URL;
  } else if (process.env.NODE_ENV === "production") {
    BASE_URL = LIVE_URL;
  } else {
    BASE_URL = DEMO_URL;
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      subject: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (pricingMessage) {
      setValue("message", pricingMessage);
    }
  }, [pricingMessage, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        phone: data.phone || "",
        description: data.message,
        inquiryOf: destination,
      };
      setLoading(true);
      setFormMessage({ text: "", type: "" });

      const res = await fetch(`${BASE_URL}/api/public/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        setFormMessage({
          text: result.message || "Something went wrong",
          type: "error",
        });
        return;
      }

      setFormMessage({
        text: "Thank you! We will contact you shortly.",
        type: "success",
      });

      reset();
      dispatch(clearPricingData());
    } catch (error) {
      console.error("Lead submit error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-4 md:py-10 bg-gray-100" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[var(--custom-red)] mb-2">
          Contact Us
        </h2>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-6">
          <div className="flex items-start gap-4">
            <Phone className="text-[var(--custom-red)] mt-6 " />
            <div>
              <h3 className="font-bold mb-1 text-lg md:text-xl">Phone:</h3>
              <p>01-5970736</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Home className="text-[var(--custom-red)] mt-6 " />
            <div>
              <h3 className="font-bold mb-1 text-lg md:text-xl">Address:</h3>
              <p>
                Nepal Can International,Tinkune, Muni Bhairab Marg, Kathmandu
                44600
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Email className="text-[var(--custom-red)] mt-6 " />
            <div>
              <h3 className="font-bold mb-1 text-lg md:text-xl">Email:</h3>
              <p>support@international.nepalcan.com</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form
            className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            {formMessage.text && (
              <Typography
                variant="body1"
                sx={{
                  color: formMessage.type === "success" ? "green" : "red",
                  fontWeight: 500,
                }}
              >
                {formMessage.text}
              </Typography>
            )}
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subject"
                  fullWidth
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone must be numbers only",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Message"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "var(--custom-red)",
                textTransform: "none",
                fontSize: "1rem",
                py: 1.2,
                width: "200px",
                "&:hover": { bgcolor: "#c60000" },
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Map */}
          <div
            className="rounded-lg overflow-hidden shadow-md 
            h-64 sm:h-72 lg:h-full"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883.2653398144864!2d85.3473702503366!3d27.684498372846182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4f4fb0179%3A0xbe53904252e95812!2sNepal%20Can%20Move%20(NCM)%20-%20Tinkune%20%7C%20National%20%26%20International%20Courier%20Service!5e0!3m2!1sen!2snp!4v1763350890950!5m2!1sen!2snp"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
