"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const FooterCopyButton = ({ bankAccount }: { bankAccount: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccount.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className="relative group cursor-pointer w-full text-left"
      onClick={handleCopyAccount}
      title="Kliknij, aby skopiować numer konta"
    >
      <div className="bg-white/5 border border-white/10 rounded px-3 py-3 font-mono text-xs sm:text-sm text-arylideYellow transition-colors group-hover:bg-white/10 group-hover:border-arylideYellow/30">
        {bankAccount}
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-arylideYellow transition-colors">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </div>

      {/* Tooltip (Czysty CSS) */}
      <div
        className={`
          absolute -top-8 right-0 text-[10px] bg-arylideYellow text-raisinBlack font-bold px-2 py-1 rounded 
          transition-all duration-300 transform origin-bottom
          ${copied ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"}
        `}
      >
        Skopiowano!
      </div>
    </button>
  );
};
