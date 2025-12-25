"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BRAND = "#dc1e3e";

export default function BranchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPage = Number(searchParams.get("page")) || 1;
  const urlSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [branches, setBranches] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update URL if the search input differs from URL
      if (searchInput.trim() !== urlSearch) {
        const params = new URLSearchParams();
        if (searchInput.trim()) {
          params.set("search", searchInput.trim());
        }
        // Reset to page 1 when search changes
        router.push(`/branch${params.toString() ? `?${params}` : ""}`);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, urlSearch, router]);

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://app.international.nepalcan.com/api/public/branch-list?page=${urlPage}&search=${urlSearch}`
        );
        const data = await res.json();

        setBranches(data.data || []);
        setPagination(data.pagination || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [urlPage, urlSearch]);

  const updateUrl = (nextPage, nextSearch) => {
    const params = new URLSearchParams();

    if (nextPage > 1) params.set("page", nextPage.toString());
    if (nextSearch && nextSearch.trim()) params.set("search", nextSearch.trim());

    router.push(`/branch${params.toString() ? `?${params}` : ""}`);
  };

  const isSearching = searchInput.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <h1
        className="text-3xl font-bold text-center mt-4 mb-8"
        style={{ color: BRAND }}
      >
        Our Branches
      </h1>

      {/* SEARCH BAR */}
      <div className="mb-6 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateUrl(1, searchInput);
              }
            }}
            placeholder="Search branch by name, code, address..."
            className="w-full h-11 px-5 pr-10 text-sm border rounded-lg outline-none transition-all focus:ring-1 focus:ring-red-500"
            style={{
              borderColor: isSearching ? BRAND : "#e5e7eb",
            }}
          />

          {isSearching && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                updateUrl(1, "");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <button
          type="button"
          onClick={() => updateUrl(1, searchInput)}
          className="h-11 px-4 rounded-lg flex items-center justify-center text-white transition hover:opacity-90"
          style={{ backgroundColor: BRAND }}
        >
          <SearchIcon />
        </button>
      </div>

      {/* TABLE */}
      <div
        className="relative overflow-x-auto rounded-xl border"
        style={{ borderColor: BRAND }}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <div className="h-6 w-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <table className="w-full">
          <thead style={{ backgroundColor: BRAND }}>
            <tr className="text-white text-sm uppercase">
              <th className="px-6 py-4 text-left">Code</th>
              <th className="px-6 py-4 text-left">Branch</th>
              <th className="px-6 py-4 text-left">Address</th>
              <th className="px-6 py-4 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>
            {branches.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  {loading ? "Loading..." : "No branches found"}
                </td>
              </tr>
            ) : (
              branches.map((branch, i) => {
                const params = new URLSearchParams();
                if (urlPage > 1) params.set("page", urlPage.toString());
                if (urlSearch) params.set("search", urlSearch);

                return (
                  <tr
                    key={branch._id}
                    onClick={() =>
                      router.push(
                        `/branch/${branch._id}${
                          params.toString() ? `?${params}` : ""
                        }`
                      )
                    }
                    className={`cursor-pointer ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-red-50`}
                  >
                    <td className="px-6 py-4">{branch.code}</td>
                    <td
                      className="px-6 py-4 font-semibold"
                      style={{ color: BRAND }}
                    >
                      {branch.name}
                    </td>
                    <td className="px-6 py-4">{branch.address}</td>
                    <td className="px-6 py-4">{branch.phone}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="flex justify-center gap-6 mt-10">
          <button
            disabled={urlPage === 1 || loading}
            onClick={() => updateUrl(urlPage - 1, urlSearch)}
            className="px-4 py-2 border rounded-md disabled:opacity-40"
            style={{ borderColor: BRAND, color: BRAND }}
          >
            Previous
          </button>

          <span className="font-medium">
            Page {urlPage} of {pagination.totalPages}
          </span>

          <button
            disabled={urlPage === pagination.totalPages || loading}
            onClick={() => updateUrl(urlPage + 1, urlSearch)}
            className="px-4 py-2 rounded-md text-white disabled:opacity-40"
            style={{ backgroundColor: BRAND }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}