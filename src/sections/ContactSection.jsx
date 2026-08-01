import { motion, useReducedMotion } from "motion/react";

import OrnamentDivider from "../components/ui/OrnamentDivider";
import invitationData from "../data/invitationData";

const smoothEase = [0.22, 1, 0.36, 1];

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-7"
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.75 7.38L3.5 20l1.15-4.12A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M9.2 7.7c.2-.45.42-.46.62-.47h.32c.1 0 .26.04.4.34l.7 1.62c.08.2.1.34 0 .52l-.34.55c-.1.16-.2.3-.08.54.12.24.55.9 1.18 1.45.82.73 1.5.96 1.73 1.07.23.12.37.1.5-.07l.65-.76c.16-.2.33-.16.55-.08l1.74.82c.23.1.38.16.44.25.05.08.05.5-.12.96-.16.46-.95.88-1.32.94-.34.06-.78.09-1.26-.07-.3-.1-.68-.22-1.16-.43-.5-.22-2.08-.77-3.54-2.37-1.14-1.25-1.8-2.62-2-3.06-.2-.44-.02-.68.15-.9Z" />
    </svg>
  );
}

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const { contacts } = invitationData;

  const whatsAppUrl = `https://wa.me/${contacts.whatsAppPhone}?text=${encodeURIComponent(
    contacts.whatsAppMessage,
  )}`;

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative overflow-hidden bg-[#f5ede6] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-[130%] -translate-x-1/2 rounded-b-[50%] bg-[#ead8ca]/55 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.header
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: smoothEase,
          }}
          className="text-center"
        >
          <p className="text-sm font-medium text-[#9a7c65]">
            {contacts.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,8vw,3.1rem)] leading-[1.4] text-[#604b3d]">
            {contacts.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[0.98rem] leading-8 text-[#74655a]">
            {contacts.description}
          </p>
        </motion.header>

        <OrnamentDivider size="small" className="mt-8" />

        <motion.a
          href={whatsAppUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          whileTap={{ scale: 0.985 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.16,
            duration: shouldReduceMotion ? 0.2 : 0.68,
            ease: smoothEase,
          }}
          className="mx-auto mt-12 flex max-w-sm flex-col items-center rounded-[30px] border border-[#c8a66d]/28 bg-[#fffaf2]/78 px-7 py-9 text-center shadow-[0_20px_50px_rgba(92,66,48,0.1)] backdrop-blur-sm transition-colors hover:bg-[#fffaf2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9935e]/55 focus-visible:ring-offset-4"
        >
          <span className="flex size-16 items-center justify-center rounded-full border border-[#bd9a62]/35 bg-[#695444] text-[#fffaf2] shadow-[0_12px_26px_rgba(92,66,48,0.16)]">
            <WhatsAppIcon />
          </span>

          <p className="mt-5 font-serif text-[1.35rem] leading-8 text-[#604b3d]">
            {contacts.cardTitle}
          </p>

          <p
            dir="ltr"
            className="font-latin mt-4 text-xl tracking-[0.04em] text-[#7b6553]"
          >
            +{contacts.whatsAppPhone}
          </p>

          <span className="mt-4 text-xs font-medium text-[#927866]">
            {contacts.buttonLabel}
          </span>
        </motion.a>
      </div>
    </section>
  );
}
