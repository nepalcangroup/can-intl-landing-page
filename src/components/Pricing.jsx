"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";

export default function PricingPage() {
  const router = useRouter();

  const LIVE_URL = "https://app.international.nepalcan.com";
  const DEMO_URL = "https://can-intl.onrender.com";

  const BASE_URL = LIVE_URL;

  const [countryList, setCountryList] = useState([]);
  const [origin] = useState("Nepal");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("document");
  const [service, setService] = useState("express");
  const [price, setPrice] = useState(null);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleClick = () => {
    router.push("/#contact"); // navigate to contact page
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
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const calculateRate = async () => {
    if (type === "parcel" && service === "standard") {
      alert(
        "Invalid combination: Parcel cannot be shipped with Standard service."
      );
      return;
    }

    try {
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
        alert(data.message);
        return;
      }

      setPrice(data?.data?.finalRate ?? 0);
    } catch (err) {
      console.error("Rate fetch error:", err);
    }
  };

  const sendContact = () => {
    if (!contactName || !contactEmail) {
      alert("Please fill in your name and email.");
      return;
    }
    alert(`Thank you ${contactName}! We will contact you to send your order.`);
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-10 bg-gray-50 min-h-screen">
      <h2 className="pt-10 text-2xl sm:text-3xl font-extrabold text-center text-red-600 mb-8">
        International Courier Pricing
      </h2>

      <div className="max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-red-200 w-full">
        {/* Origin */}
        <label className="block font-semibold text-gray-700 mb-1">Origin</label>
        <input
          value={origin}
          disabled
          className="w-full Top-3 rounded-lg border mb-4 bg-gray-100 text-sm sm:text-base"
        />

        {/* Destination */}
        <label className="block font-semibold text-gray-700 mb-1">
          Destination Country
        </label>
        <Select
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
        />

        {/* Shipment Type */}
        <label className="block font-semibold text-gray-700 mb-1">
          Shipment Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 rounded-lg border mb-4 text-sm sm:text-base"
        >
          <option value="document">Document</option>
          <option value="parcel">Parcel</option>
        </select>

        {/* Service Type */}
        <label className="block font-semibold text-gray-700 mb-1">
          Service Type
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-3 rounded-lg border mb-4 text-sm sm:text-base"
        >
          <option value="express">Express</option>
          <option value="standard">Standard</option>
        </select>

        {/* Weight */}
        <label className="block font-semibold text-gray-700 mb-1">
          Weight (kg)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight in KG"
          className="w-full p-3 rounded-lg border mb-4 text-sm sm:text-base"
        />

        {/* Button */}
        <button
          onClick={calculateRate}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition mt-2"
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
            >
              Send Your Order
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
