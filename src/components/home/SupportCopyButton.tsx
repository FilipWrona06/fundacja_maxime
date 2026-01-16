"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface SupportCopyButtonProps {
  value: string;
  label: string;
}

export const SupportCopyButton = ({ value, label }: SupportCopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="relative flex items-center justify-between w-full max-w-md border-b border-white/20 py-4 group hover:border-arylideYellow transition-colors duration-500 text-left"
    >
      <div className="flex flex-col items-start">
        <span className="text-[10px] uppercase text-white/30 tracking-widest mb-1">
          {label}
        </span>
        <span className="font-mono text-2xl text-white tracking-widest group-hover:text-arylideYellow transition-colors duration-300">
          {value}
        </span>
      </div>

      <div className="text-white/30 group-hover:text-white transition-colors">
        {copied ? (
          <Check className="w-5 h-5 text-arylideYellow" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </div>

      {/* Toast Notification (CSS Animation) */}
      <div
        className={`absolute right-0 -top-8 text-[10px] text-arylideYellow uppercase tracking-widest font-bold transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Skopiowano
      </div>
    </button>
  );
};
