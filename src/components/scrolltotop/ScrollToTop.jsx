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
        className="px-6 py-2 bg-primary text-white rounded-full hover:bg-black border border-primary transition ease-out duration-200"
      >
        Top
      </button>
    </div>
  );
}
