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

  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "DISCOVER US", href: "#discover" },
    { label: "ABOUT US", href: "#about" },
    { label: "OUR SERVICES", dropdown: true },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT US", href: "#contact" },
    { label: "PRICING", href: "pricing" },

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

    for (let i = navItems.length - 1; i >= 0; i--) {
      const href = navItems[i].href;
      if (!href || navItems[i].external) continue;
      const element = document.querySelector(href);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setActive(navItems[i].label);
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
          const matched = navItems.find((item) => item.href === hash);
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

    // Real pages in the future
    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isTop && pathname === "/"
          ? "text-white bg-transparent"
          : "text-black bg-white shadow-md"
      }`}
    >
      <div className="mx-6 flex items-center justify-between py-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Image
            src={
              isTop && pathname === "/"
                ? "/logo/CanIntlWhite.png"
                : "/logo/can_international_logo.png"
            }
            alt="Can International"
            width={333}
            height={100}
            className="rounded transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-8 relative items-center">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {!item.dropdown ? (
                  <a
                    onClick={(e) => handleNavClick(e, item)}
                    className={`relative font-medium cursor-pointer pb-1 select-none
                      ${isTop && pathname === "/" ? "text-white" : "text-black"}
                      after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                      after:bg-[var(--custom-red)] after:origin-left after:transition-transform after:duration-300
                      ${pathname === "/" ? "hover:after:scale-x-100" : ""} 
                      ${
                        active === item.label
                          ? "after:scale-x-100"
                          : "after:scale-x-0"
                      }
                    `}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <div
                      className={`flex items-center gap-1 font-medium cursor-pointer select-none pb-1
                        ${
                          isTop && pathname === "/"
                            ? "text-white"
                            : "text-black"
                        }
                      `}
                      onClick={() => setServicesOpen((prev) => !prev)}
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
                        className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 w-56 z-50"
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        {servicesNav.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="block px-2 py-2 text-black hover:text-[var(--custom-red)]"
                            onClick={() => {
                              setServicesOpen(false);
                              setMenuOpen(false);
                            }}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Buttons */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--custom-red)",
              textTransform: "none",
              "&:hover": { bgcolor: "#c60000" },
            }}
            onClick={() =>
              window.open("https://app.international.nepalcan.com/public", "_blank")
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <IconButton
            onClick={() => {
              setMenuOpen((s) => !s);
              setServicesOpen(false);
            }}
          >
            {menuOpen ? (
              <CloseIcon
                className={`${
                  isTop && pathname === "/" ? "text-white" : "text-black"
                }`}
              />
            ) : (
              <MenuIcon
                className={`${
                  isTop && pathname === "/" ? "text-white" : "text-black"
                }`}
              />
            )}
          </IconButton>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-4 z-50 flex flex-col gap-4 px-4 py-4 bg-white text-black shadow-lg rounded-lg w-56">
          {navItems.map((item) => (
            <div key={item.label}>
              {!item.dropdown ? (
                <a
                  className={`cursor-pointer font-medium ${
                    active === item.label && pathname === "/"
                      ? "text-[var(--custom-red)]"
                      : "text-black"
                  }`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ) : (
                <div>
                  <p
                    className="cursor-pointer font-medium flex justify-between items-center"
                    onClick={() => setServicesOpen((prev) => !prev)}
                  >
                    OUR SERVICES
                    <span>{servicesOpen ? "▲" : "▼"}</span>
                  </p>

                  {servicesOpen && (
                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {servicesNav.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="text-black hover:text-[var(--custom-red)]"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--custom-red)",
              textTransform: "none",
              "&:hover": { bgcolor: "#c60000" },
            }}
            onClick={() =>
              window.open("https://can-intl.onrender.com/public", "_blank")
            }
          >
            Track My Order
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--custom-red)",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "#c60000" },
            }}
            onClick={() =>
              (window.location.href =
                "https://app.transport.thecanbrand.com/sign-in")
            }
          >
            Login
          </Button>
        </div>
      )}
    </header>
  );
}
