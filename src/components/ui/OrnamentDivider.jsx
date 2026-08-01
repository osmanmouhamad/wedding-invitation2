const sizes = {
  small: "w-12 sm:w-20",
  medium: "w-16 sm:w-24",
};

const tones = {
  gold: {
    line: "bg-[#bd9a62]/50",
    diamond: "border-[#bd9a62]/75 bg-[#fffaf2]/60",
  },
  brown: {
    line: "bg-[#695444]/35",
    diamond: "border-[#695444]/60 bg-[#fffaf2]/45",
  },
  ivory: {
    line: "bg-[#fffaf2]/40",
    diamond: "border-[#fffaf2]/75 bg-white/10",
  },
};

export default function OrnamentDivider({
  size = "medium",
  tone = "gold",
  className = "",
}) {
  const selectedSize = sizes[size] ?? sizes.medium;
  const selectedTone = tones[tone] ?? tones.gold;

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span className={`h-px ${selectedSize} ${selectedTone.line}`} />
      <span
        className={`size-2 rotate-45 border ${selectedTone.diamond}`}
      />
      <span className={`h-px ${selectedSize} ${selectedTone.line}`} />
    </div>
  );
}
