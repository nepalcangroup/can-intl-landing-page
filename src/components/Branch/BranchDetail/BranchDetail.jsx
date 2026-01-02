"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Phone,
  PhoneCall,
  MapPinned,
  Building,
  Map,
  Landmark,
  Hash,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import InfoCard from "./InfoCard";
import SectionHeader from "./SectionHeader";
import WorkingHoursCard from "./WorkingHoursCard";
import ServiceCard from "./ServiceCard";
import LocationMap from "./LocationMap";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import BranchHero from "./BranchHero";
import { FloatingOrderButton } from "./FloatingOrderButton";
import { OrderPromptCard } from "./OrderPromptCards";

export default function BranchDetail({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params?.id;

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  // Handle both formats: "123" and "123-branch-name"
  const id = slug ? (slug.includes("-") ? slug.split("-")[0] : slug) : null;

  const [branch, setBranch] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!id) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Invalid Branch URL
        </h2>
        <p className="text-muted-foreground max-w-md">
          No branch ID provided in the URL.
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (!id) return;

    const fetchBranchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://app.international.nepalcan.com/api/public/branch/${id}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (!data.data) {
          throw new Error("No branch data received");
        }

        setBranch(data.data);
        setServices(data.services || []);
      } catch (err) {
        console.error("Error fetching branch details:", err);
        setError(err.message);
        setBranch(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBranchDetail();
  }, [id]);

  if (loading) return <LoadingSkeleton />;
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Error Loading Branch
        </h2>
        <p className="text-muted-foreground max-w-md mb-4">
          {error.includes("Failed to fetch") ||
          error.includes("ERR_CONNECTION_REFUSED")
            ? "Unable to connect to the server. Please make sure the backend is running on localhost:5002."
            : error}
        </p>
        <div className="text-sm text-muted-foreground">Branch ID: {id}</div>
      </div>
    );
  }
  if (!branch) return <EmptyState type="not-found" />;

  const handleOrderClick = () => {
    const message = `I want to inquire about sending parcel abroad from ${branch.name}`;
    router.push(`/?message=${encodeURIComponent(message)}#contact`);
  };
  return (
    <>
      <FloatingOrderButton onClick={handleOrderClick} />
      <div className="branch-theme min-h-screen bg-background text-foreground mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* BACK BUTTON */}
          <button
            onClick={() => {
              const queryParams = new URLSearchParams();
              if (page !== "1") queryParams.set("page", page);
              if (search) queryParams.set("search", search);
              const queryString = queryParams.toString();
              const url = `/branch${queryString ? `?${queryString}` : ""}`;
              router.push(url);
            }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* HERO */}
          <div className="bg-card rounded-2xl shadow-elevated mb-12">
            <BranchHero
              name={branch.name}
              address={branch.address}
              code={branch.code}
              phone={branch.phone}
            />
          </div>

          {/* INFO */}
          <section className="mb-14 animate-fade-in">
            <SectionHeader
              title="Branch Information"
              subtitle="Contact details and coverage area"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <InfoCard
                icon={<Hash />}
                label="Branch Code"
                value={branch.code}
              />
              <InfoCard icon={<Phone />} label="Phone" value={branch.phone} />
              <InfoCard
                icon={<PhoneCall />}
                label="Additional Phone"
                value={branch.additionalPhone}
              />
              <InfoCard
                icon={<MapPinned />}
                label="Areas Covered"
                value={branch.areasCovered}
              />
              <InfoCard
                icon={<Building />}
                label="Province"
                value={branch.province?.name}
              />
              <InfoCard
                icon={<Map />}
                label="District"
                value={branch.district?.name}
              />
              <InfoCard
                icon={<Landmark />}
                label="Municipality"
                value={branch.municipality?.name}
              />
            </div>
          </section>

          {/* WORKING HOURS */}
          {Array.isArray(branch.workingHours) &&
            branch.workingHours.length > 0 && (
              <section className="mb-14">
                <SectionHeader
                  title="Working Hours"
                  subtitle="Our weekly schedule"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  {branch.workingHours?.map((day, index) => (
                    <WorkingHoursCard key={day._id} day={day} index={index} />
                  ))}
                </div>
              </section>
            )}
          {/* SERVICES */}
          {services && services.length > 0 && (
            <section className="mb-14">
              <SectionHeader
                title="Services Available"
                subtitle="What we offer at this location"
              />
              <div className="grid sm:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}

          <section
            className="mb-12 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <OrderPromptCard
              branchName={branch.name}
              onOrderClick={handleOrderClick}
            />
          </section>

          {/* MAP */}
          {(branch.coordinates?.lat > 0 && branch.coordinates?.long > 0) ||
          (branch.canAddress?.coordinates?.lat > 0 &&
            branch.canAddress?.coordinates?.lng > 0) ? (
            <section className="mb-14">
              <SectionHeader title="Location" subtitle="Find us here" />
              <LocationMap
                lat={
                  branch.coordinates?.lat || branch.canAddress?.coordinates?.lat
                }
                long={
                  branch.coordinates?.long ||
                  branch.canAddress?.coordinates?.lng
                }
                name={branch.name}
              />
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
