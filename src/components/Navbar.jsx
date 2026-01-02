"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const primaryItems = [
    { label: "DISCOVER US", href: "#discover" },
    { label: "ABOUT", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
  ];

  const secondaryItems = [
    { label: "OUR SERVICES", dropdown: true },
    { label: "PRICING", href: "/pricing" },
    { label: "OUR BRANCHES", href: "/branch" },
    {
      label: "CAREER",
      href: "https://bayupayu.com/vacancy/NCG?page=1",
      external: true,
    },
  ];

  const servicesNav = [
    { label: "Air Freight", slug: "air-freight" },
    { label: "Ocean Freight", slug: "ocean-freight" },
    { label: "Land Transport", slug: "land-transport" },
    { label: "Customs Clearance", slug: "customs-clearance" },
    { label: "24/7 Customer Support", slug: "customer-support" },
    { label: "Real Time Tracking", slug: "real-time-tracking" },
  ];

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      const navbarHeight = 80;
      const offset =
        section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const updateActiveNavItem = () => {
    if (pathname !== "/") return;

    for (let i = primaryItems.length - 1; i >= 0; i--) {
      const item = primaryItems[i];
      const href = item.href;
      if (!href || item.dropdown || item.external || !href.startsWith("#"))
        continue;
      const element = document.querySelector(href);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setActive(item.label);
          return;
        }
      }
    }

    setActive("DISCOVER US");
  };

  useEffect(() => {
    const handleScroll = () => {
      const isHomePage = pathname === "/";
      const heroThreshold = window.innerHeight - 100;
      const scrollPosition = window.scrollY;
      setIsTop(isHomePage && scrollPosition < heroThreshold);
      updateActiveNavItem();
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          scrollToSection(hash);
          const matched = primaryItems.find((item) => item.href === hash);
          if (matched) setActive(matched.label);
        }, 120);
      } else {
        updateActiveNavItem();
      }
    } else {
      setActive("");
    }
  }, [pathname]);

  const handleNavClick = (e, item) => {
    e.preventDefault();

    setMenuOpen(false);
    setServicesOpen(false);
    setMoreOpen(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.href?.startsWith("#")) {
      const targetUrl = `/${item.href}`;
      router.push(targetUrl);
      setActive(item.label);
      return;
    }

    if (item.href) {
      router.push(item.href);
    }
  };

  const renderNavLink = (item) => (
    <a
      onClick={(e) => handleNavClick(e, item)}
      className={`relative font-medium cursor-pointer pb-1 select-none
        ${isTop && pathname === "/" ? "text-white" : "text-black"}
        after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
        after:bg-[var(--custom-red)] after:origin-left after:transition-transform after:duration-300
        ${pathname === "/" ? "hover:after:scale-x-100" : ""} 
        ${active === item.label ? "after:scale-x-100" : "after:scale-x-0"}
      `}
    >
      {item.label}
    </a>
  );

  const renderServicesInMoreDropdown = () => {
    return (
    <>
      <div
        className="flex items-center gap-1 font-medium cursor-pointer select-none pb-1 text-black"
        onClick={() => {
          setServicesOpen((prev) => !prev);
        }}
      >
        <span>OUR SERVICES</span>
        <span
          className={`transform transition-transform ${
            servicesOpen ? "rotate-180" : "rotate-0"
          } text-black`}
        >
          ▼
        </span>
      </div>

      {servicesOpen && (
        <div
          className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 w-56 z-50 text-black"
          onMouseLeave={() => setServicesOpen(false)}
        >
          {servicesNav.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="block px-2 py-2 hover:text-[var(--custom-red)]"
              onClick={() => {
                setServicesOpen(false);
                setMenuOpen(false);
                setMoreOpen(false);
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
  };

  const renderMoreDropdown = () => (
    <div className="relative">
      <div
        className={`flex items-center gap-1 font-medium cursor-pointer select-none pb-1
          ${isTop && pathname === "/" ? "text-white" : "text-black"}
        `}
        onClick={() => {
          setMoreOpen((prev) => !prev);
          setServicesOpen(false);
        }}
      >
        <span>MORE</span>
        <span
          className={`transform transition-transform ${
            moreOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {moreOpen && (
        <div
          className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-4 w-56 z-50 text-black"
          onMouseLeave={() => setMoreOpen(false)}
        >
          <div className="mb-4">
            {renderServicesInMoreDropdown()}
          </div>

          {/* Other secondary items */}
          {secondaryItems
            .filter((item) => !item.dropdown)
            .map((item) => (
              <a
                key={item.label}
                onClick={(e) => {
                  handleNavClick(e, item);
                  setMoreOpen(false);
                }}
                className="block px-2 py-2 hover:text-[var(--custom-red)] cursor-pointer"
              >
                {item.label}
              </a>
            ))}
        </div>
      )}
    </div>
  );

  // For xl+ screens: normal dropdown 
  const renderServicesDropdown = () => (
    <>
      <div
        className={`flex items-center gap-1 font-medium cursor-pointer select-none pb-1
          ${isTop && pathname === "/" ? "text-white" : "text-black"}
        `}
        onClick={() => {
          setServicesOpen((prev) => !prev);
          setMoreOpen(false);
        }}
      >
        <span>OUR SERVICES</span>
        <span
          className={`transform transition-transform ${
            servicesOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {servicesOpen && (
        <div
          className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 w-56 z-50 text-black"
          onMouseLeave={() => setServicesOpen(false)}
        >
          {servicesNav.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="block px-2 py-2 hover:text-[var(--custom-red)]"
              onClick={() => {
                setServicesOpen(false);
                setMenuOpen(false);
                setMoreOpen(false);
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );

  const renderSecondaryItem = (item) => {
    if (item.dropdown) {
      return renderServicesDropdown(); 
    }
    return renderNavLink(item);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isTop && pathname === "/"
          ? "text-white bg-transparent"
          : "text-black bg-white shadow-md"
      }`}
    >
      <div className="mx-6 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={
              isTop && pathname === "/"
                ? "/logo/CanIntlWhite.png"
                : "/logo/can_international_logo.png"
            }
            alt="Can International"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[250px] lg:w-[300px] xl:w-[350px] h-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 items-center">
            {/* Primary Items */}
            {primaryItems.map((item) => (
              <div key={item.label} className="relative">
                {renderNavLink(item)}
              </div>
            ))}

            {/* Secondary Items: Full on xl+, More dropdown on lg */}
            <div className="hidden xl:flex gap-8 items-center">
              {secondaryItems.map((item) => (
                <div key={item.label} className="relative">
                  {renderSecondaryItem(item)}
                </div>
              ))}
            </div>

            <div className="xl:hidden">
              {renderMoreDropdown()}
            </div>
          </nav>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              variant="contained"
              sx={{
                bgcolor: "var(--custom-red)",
                textTransform: "none",
                "&:hover": { bgcolor: "#c60000" },
              }}
              onClick={() =>
                window.open(
                  "https://app.international.nepalcan.com/public",
                  "_blank"
                )
              }
            >
              Track My Order
            </Button>

            <Button
              variant="contained"
              sx={{
                bgcolor: "var(--custom-red)",
                textTransform: "none",
                "&:hover": { bgcolor: "#c60000" },
              }}
              onClick={() =>
                (window.location.href = "https://app.international.nepalcan.com/")
              }
            >
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <IconButton
            onClick={() => {
              setMenuOpen((s) => !s);
              setServicesOpen(false);
              setMoreOpen(false);
            }}
          >
            {menuOpen ? (
              <CloseIcon
                className={`${isTop && pathname === "/" ? "text-white" : "text-black"}`}
              />
            ) : (
              <MenuIcon
                className={`${isTop && pathname === "/" ? "text-white" : "text-black"}`}
              />
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden absolute top-16 right-4 z-50 bg-white shadow-lg rounded-lg w-64 px-6 py-5 flex flex-col gap-5 text-black">
            {primaryItems.map((item) => (
              <a
                key={item.label}
                onClick={(e) => handleNavClick(e, item)}
                className={`font-medium cursor-pointer ${
                  active === item.label && pathname === "/" ? "text-[var(--custom-red)]" : ""
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Services in Mobile */}
            <div>
              <p
                className="font-medium flex justify-between items-center cursor-pointer"
                onClick={() => setServicesOpen((prev) => !prev)}
              >
                OUR SERVICES
                <span>{servicesOpen ? "▲" : "▼"}</span>
              </p>
              {servicesOpen && (
                <div className="pl-4 mt-3 flex flex-col gap-3">
                  {servicesNav.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[var(--custom-red)]"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other secondary items */}
            {secondaryItems
              .filter((item) => !item.dropdown)
              .map((item) => (
                <a
                  key={item.label}
                  onClick={(e) => {
                    handleNavClick(e, item);
                    setMenuOpen(false);
                  }}
                  className="font-medium cursor-pointer hover:text-[var(--custom-red)]"
                >
                  {item.label}
                </a>
              ))}

            <div className="flex flex-col gap-3 pt-3">
              <Button fullWidth variant="contained" sx={{ bgcolor: "var(--custom-red)", textTransform: "none", "&:hover": { bgcolor: "#c60000" } }}
                onClick={() => window.open("https://app.international.nepalcan.com/public", "_blank")}
              >
                Track My Order
              </Button>
              <Button fullWidth variant="contained" sx={{ bgcolor: "var(--custom-red)", textTransform: "none", "&:hover": { bgcolor: "#c60000" } }}
                onClick={() => (window.location.href = "https://app.international.nepalcan.com/")}
              >
                Login
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}