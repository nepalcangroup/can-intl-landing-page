"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

const faqs = [
  {
    question: "How can I track my shipment?",
    answer:
      "You can track your shipment in real time using the 'Track My Order' button in the navigation bar.",
  },
  {
    question: "What areas do you provide logistics services in?",
    answer:
      "We provide logistics services nationwide and also offer international shipping solutions.",
  },

  {
    question: "How do I get a price quote?",
    answer:
      "You can request a free quote by filling out the contact form or reaching out to our support team.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full py-4 md:py-20 bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.15),white)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--custom-red)] mb-4 md:mb-6">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                marginBottom: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className="text-[var(--custom-red)]" />
                }
              >
                <Typography variant="subtitle1" className="font-semibold">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" className="text-gray-600">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <div className="relative w-full h-60 lg:h-[500px] rounded-lg overflow-hidden shadow-md hidden lg:block">
          <Image
            src="/faq/faq.jpg"
            alt="Can International FAQ"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
