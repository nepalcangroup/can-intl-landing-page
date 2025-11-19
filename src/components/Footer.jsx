"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  LinkedIn,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-[var(--custom-red)] text-white py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-2">Can International</h2>
          <p className="text-sm mb-4">Beyond Borders, Beyond Expectations.</p>

          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-200"
            >
              <Facebook />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-200"
            >
              <Twitter />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-200"
            >
              <LinkedIn />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <div className="flex items-start gap-2 mb-2">
            <LocationOn fontSize="small" />
            <p className="text-sm">
              Muni Bhairab Marg, Kathmandu 44600
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Email fontSize="small" />
            <p className="text-sm">support@logisitics.nepalcan.com</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone fontSize="small" />
            <p className="text-sm">01-5970736</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 border-t border-white/40 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex space-x-4 mb-2 md:mb-0">
          <Link href="/privacy-policy" className="text-white hover:underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/terms" className="text-white hover:underline">
            Terms & Conditions
          </Link>
        </div>
        <p className="text-center">
          © 2025 Nepal Can Group. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
