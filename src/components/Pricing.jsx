"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { clearPricingData, setPricingData } from "@/store/pricingSlice";
import { toast } from "react-toastify";

// Dynamically import react-select to avoid SSR hydration issues
const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function PricingPage() {
  const router = useRouter();

  const LIVE_URL = "https://app.international.nepalcan.com";
  const DEMO_URL = "https://can-intl.onrender.com";
  const LOCAL_URL = "http://localhost:5002";

  let BASE_URL;
  if (process.env.NEXT_PUBLIC_ENV === "development") {
    BASE_URL = DEMO_URL;
  } else if (process.env.NEXT_PUBLIC_ENV === "production") {
    BASE_URL = LIVE_URL;
  } else {
    BASE_URL = LOCAL_URL;
  }

  const BRAND_COLOR = "#dc1e3e";

  const [countryList, setCountryList] = useState([]);
  const [origin] = useState("Nepal");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    if (price) {
      const pricingInfo = {
        origin,
        destination,
        shipmentType: type,
        serviceType: service,
        weight: Number(weight),
        price,
        currency: "NPR",
        contactMessage: `I am sending my ${type} from ${origin} to ${destination}, Service: ${service}, Weight: ${weight}kg, Estimated Price: NPR ${price}`,
      };

      // Store in Redux
      dispatch(setPricingData(pricingInfo));
    } else {
      dispatch(clearPricingData());
    }
    router.push("/#contact");
  };

  const fetchCountries = async () => {
    try {
      const url = `${BASE_URL}/api/public/country/ddl`;
      const res = await fetch(url, { method: "GET" });

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setCountryList(data);
        if (data.length > 0) setDestination(data[0].name);
      } else {
        setCountryList([]);
      }
    } catch (err) {
      console.error("Country fetch error:", err);
      toast.error("Failed to load countries. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const calculateRate = async () => {
    if(!type && !service && !weight){
      toast.error("Please enter all the fields");
      return;
    }
    
 
      if (!destination) {
      toast.error("Please select a destination country.");
      return;
    }

    if (!type) {
      toast.error("Please select a shipment type.");
      return;
    }

    if (!service) {
      toast.error("Please select a service type.");
      return;
    }

    if (!weight || weight <= 0) {
      toast.error("Please enter a valid weight.");
      return;
    }
  

    try {
      setIsLoading(true);
      const payload = {
        destination,
        type,
        service,
        weight: Number(weight),
      };

      const res = await fetch(`${BASE_URL}/api/public/rates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        // Handle specific zone data error with more user-friendly message
        if (data.message && data.message.includes("No zone data found")) {
          toast.error(
            `We're sorry, but we currently don't offer shipping services to ${destination}. Please contact our support team for alternative shipping options or choose a different destination country.`,
            toastConfig.error
          );
        } else {
          toast.error(
            data.message ||
              "Unable to calculate shipping rate. Please try again.",
            toastConfig.error
          );
        }
        setPrice(null);
        return;
      }

      setPrice(data?.data?.finalRate ?? 0);
      toast.success("Price calculated successfully!");
    } catch (err) {
      if (err.message === "Failed to fetch") {
        toast.error(
          "Unable to connect to pricing service. Please check your internet connection and try again.",
          toastConfig.error
        );
      } else {
        toast.error(
          "An error occurred while calculating rate. Please try again."
        );
      }
      setPrice(null);
    }
    finally{
      setIsLoading(false);
    }
  };

  const sendContact = () => {
    if (!contactName || !contactEmail) {
      toast.error("Please fill in your name and email.");
      return;
    }
    toast.success(
      `Thank you ${contactName}! We will contact you to send your order.`
    );
    setContactName("");
    setContactEmail("");
  };

  const serviceOptionsByType = {
    document: [
      { value: "express", label: "Express" },
      { value: "standard", label: "Standard" },
    ],
    parcel: [
      { value: "express", label: "Express" },
      { value: "economy", label: "Economy" },
    ],
  };

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "48px",
      height: "48px",
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? BRAND_COLOR : "#d1d5db",
      boxShadow: state.isFocused ? `0 0 0 1px ${BRAND_COLOR}` : "none",
      "&:hover": {
        borderColor: BRAND_COLOR,
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 12px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "48px",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? BRAND_COLOR
        : state.isFocused
        ? "#fee2e2"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      "&:active": {
        backgroundColor: BRAND_COLOR,
      },
    }),
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-10 bg-gray-50 min-h-screen">
      <h2
        className="pt-20 text-2xl sm:text-3xl font-extrabold text-center mb-8"
        style={{ color: BRAND_COLOR }}
      >
        International Courier Pricing
      </h2>

      <div className="max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-red-200 w-full">
        {/* Origin */}
        <label className="block font-semibold text-gray-700 mb-1">Origin</label>
        <input
          value={origin}
          disabled
          className="w-full h-12 px-3 rounded-lg border mb-4 bg-gray-100 text-sm sm:text-base"
        />

        {/* Destination */}
        <label className="block font-semibold text-gray-700 mb-1">
          Destination Country
        </label>
        {isMounted && (
          <Select
            instanceId="destination-select"
            options={countryList.map((c) => ({
              value: c.name,
              label: c.name,
              code: c.cca2,
            }))}
            value={
              destination
                ? {
                    value: destination,
                    label: destination,
                    code: countryList.find((x) => x.name === destination)?.cca2,
                  }
                : null
            }
            onChange={(item) => setDestination(item.value)}
            formatOptionLabel={(item) => (
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                  className="w-5 h-4 rounded-sm"
                  alt=""
                />
                {item.label}
              </div>
            )}
            className="mb-4"
            styles={customSelectStyles}
          />
        )}

        {/* Shipment Type */}
        <label className="block font-semibold text-gray-700 mb-1">
          Shipment Type
        </label>
        {isMounted && (
          <Select
            instanceId="shipment-type-select"
            options={[
              { value: "document", label: "Document" },
              { value: "parcel", label: "Parcel" },
            ]}
            value={
              type
                ? {
                    value: type,
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                  }
                : null
            }
            onChange={(item) => {
              setType(item.value);
              setService("");
            }}
            placeholder="Select Shipment Type"
            className="mb-1"
            styles={customSelectStyles}
          />
        )}

        <p className="text-xs text-gray-500 mb-4 px-1">
          Choose what you are sending
        </p>

        {/* Service Type */}
        <label className="block font-semibold text-gray-700 mb-1">
          Service Type
        </label>
        {isMounted && (
          <Select
            instanceId="service-type-select"
            options={type ? serviceOptionsByType[type] : []}
            value={
              service
                ? serviceOptionsByType[type]?.find((s) => s.value === service)
                : null
            }
            onChange={(item) => setService(item.value)}
            placeholder="Select Service Type"
            isDisabled={!type}
            className="mb-2"
            styles={customSelectStyles}
          />
        )}

        <p className="text-xs text-gray-500 mb-4 px-1">
          {!type ? "Select shipment type first" : "Choose delivery speed"}
        </p>

        {/* Weight */}
        <label className="block font-semibold text-gray-700 mb-1">
          Weight (KG)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => {
            const value = e.target.value;
            // Only allow positive numbers
            if (value === "" || parseFloat(value) >= 0) {
              setWeight(value);
            }
          }}
          onKeyDown={(e) => {
            // Prevent minus sign and 'e' (scientific notation)
            if (e.key === "-" || e.key === "e" || e.key === "E") {
              e.preventDefault();
            }
          }}
          min="0"
          step="1"
          placeholder="Enter weight in KG"
          className="w-full h-12 px-3 rounded-lg border border-gray-300 
             text-sm sm:text-base bg-white
             focus:outline-none focus:ring-2 focus:border-transparent
             transition mb-1"
          style={{
            "--tw-ring-color": BRAND_COLOR,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = BRAND_COLOR;
            e.target.style.boxShadow = `0 0 0 1px ${BRAND_COLOR}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
        />

        {/* Button */}
        <button
          onClick={calculateRate}
          className="w-full text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition mt-2 hover:opacity-90"
          style={{ backgroundColor: BRAND_COLOR }}
          disabled={isLoading}
        >
          Calculate Price
        </button>

        {/* Price Result */}
        {price !== null && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-base sm:text-lg font-semibold text-red-700">
              Rate:
              <span className="font-bold text-red-900"> ₹ {price} </span>
            </p>
            {/* Terms & Conditions small note */}
            <p className="text-xs text-gray-600 mt-1 italic">
              * Additional surcharges, remote area fees, or customs duties may
              apply based on destination and service type.
            </p>
            {/* Small red clickable label */}
            <span
              onClick={handleClick}
              className="ml-0 text-sm cursor-pointer hover:underline transition"
              style={{ color: BRAND_COLOR }}
            >
              Send Your Order
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
