import { motion, useReducedMotion } from "motion/react";

import ShareInvitationButton from "../components/ui/ShareInvitationButton";
import OrnamentDivider from "../components/ui/OrnamentDivider";
import invitationData from "../data/invitationData";
import {
  formatInvitationDate,
  formatInvitationTime,
} from "../utils/formatInvitationDate";

const smoothEase = [0.22, 1, 0.36, 1];

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-7"
    >
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M8 3.5v4" />
      <path d="M16 3.5v4" />
      <path d="M3.5 10h17" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-7"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3.2 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-7"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function DetailCard({ icon, label, children, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.7,
        delay: shouldReduceMotion ? 0 : delay,
        ease: smoothEase,
      }}
      className="relative overflow-hidden rounded-[28px] border border-[#c8a66d]/24 bg-[#fffaf2]/72 px-5 py-8 text-center shadow-[0_18px_45px_rgba(92,66,48,0.09)] backdrop-blur-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7px] rounded-[21px] border border-white/55"
      />

      <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#bd9a62]/30 bg-white/55 text-[#8a6c54] shadow-[0_8px_20px_rgba(92,66,48,0.07)]">
        {icon}
      </span>

      <p className="mt-4 text-sm font-medium text-[#9a7c65]">{label}</p>
      <div className="mt-3 font-serif text-[clamp(1.25rem,5vw,1.65rem)] leading-8 text-[#604b3d]">
        {children}
      </div>
    </motion.article>
  );
}

function LocationCard({ venue, label, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.7,
        delay: shouldReduceMotion ? 0 : delay,
        ease: smoothEase,
      }}
      className="relative overflow-hidden rounded-[28px] border border-[#c8a66d]/24 bg-[#fffaf2]/72 px-5 py-8 text-center shadow-[0_18px_45px_rgba(92,66,48,0.09)] backdrop-blur-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7px] rounded-[21px] border border-white/55"
      />

      <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#bd9a62]/30 bg-white/55 text-[#8a6c54] shadow-[0_8px_20px_rgba(92,66,48,0.07)]">
        <PinIcon />
      </span>

      <p className="mt-4 text-sm font-medium text-[#9a7c65]">{label}</p>
      <p className="mt-3 font-serif text-[clamp(1.25rem,5vw,1.65rem)] leading-8 text-[#604b3d]">
        {venue.name}
      </p>
      <p className="mt-1 text-sm leading-7 text-[#806d60]">{venue.address}</p>

      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="relative mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[#b9935e]/30 bg-white/50 px-4 py-2 text-xs font-medium text-[#755d49] transition hover:bg-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9935e]/55 focus-visible:ring-offset-4"
      >
        افتح الموقع على الخريطة
      </a>
    </motion.article>
  );
}

export default function WeddingDetails() {
  const shouldReduceMotion = useReducedMotion();
  const { couple, event, venue, details, sharing } = invitationData;

  const eventDate = formatInvitationDate(event.startsAt, event.timeZone);
  const eventTime = formatInvitationTime(event.startsAt, event.timeZone);

  return (
    <motion.section
      id="details"
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.75 }}
      className="relative scroll-mt-0 overflow-hidden bg-[#f5ede6] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-12 size-[25rem] rounded-full bg-[#ead8ca]/55 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-10rem] size-[22rem] rounded-full bg-[#f0dfcf]/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.75,
            ease: smoothEase,
          }}
          className="text-center"
        >
          <p
            dir="ltr"
            className="font-latin text-xs tracking-[0.28em] text-[#a1846e]"
          >
            {details.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,8vw,3.2rem)] leading-[1.4] text-[#604b3d]">
            {details.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-8 text-[#74655a]">
            {details.description}
          </p>
        </motion.header>

        <OrnamentDivider className="mt-8" />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <DetailCard
            icon={<CalendarIcon />}
            label={details.dateLabel}
            delay={0.06}
          >
            {eventDate}
          </DetailCard>

          <DetailCard
            icon={<ClockIcon />}
            label={details.timeLabel}
            delay={0.14}
          >
            {eventTime}
          </DetailCard>

          <LocationCard
            venue={venue}
            label={details.venueLabel}
            delay={0.22}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.15,
            ease: smoothEase,
          }}
          className="mt-10 text-center"
        >
          <p className="font-serif text-[clamp(1.1rem,4.7vw,1.4rem)] leading-8 text-[#715a4a]">
            {details.closingText}
          </p>

          <div className="mt-7">
            <ShareInvitationButton couple={couple} sharing={sharing} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
