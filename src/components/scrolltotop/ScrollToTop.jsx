"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-20">
      <button
        onClick={scrollToTop}
        className="bg-primary text-white px-4 py-2 rounded shadow-md"
      >
        Top
      </button>
    </div>
  );
}
