export const introTiming =
  Object.freeze({
    envelopeOpenSeconds: 4.6,
    envelopeExitSeconds: 5.2,
    heroRevealMs: 3300,
    introFadeMs: 3900,
    introCompleteMs: 5350,
  });

const invitationData = {
  couple: {
    groomName: "اسم العريس",
    brideName: "اسم العروس",

    // A للعريس أولًا، ثم M للعروس
    monogram: "A & M",
    sealLetters: ["A", "M"],
  },

  intro: {
    kicker: "بكل الحب",

    headingLines: [
      "لكل فرحٍ بداية…",
      "وبوجودكم تكتمل الحكاية",
    ],

    cardEyebrow:
      "WEDDING INVITATION",

    cardTitle:
      "دعوةٌ من القلب",

    openLabel:
      "اضغطوا على الختم",

    openingLabel:
      "جارٍ فتح الدعوة",
  },

  hero: {
    eyebrow: "بكل الحب",
    title: "نحن نتزوج",

    subtitle:
      "جمعنا الحب، ويسعدنا أن يجمعنا بكم في أجمل أيام العمر.",
  },
};

export default invitationData;