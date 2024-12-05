"use client"; // Mark this as a client component

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
      behavior: "smooth" // Smooth scrolling animation
    });
  };

  return (
    <div className="fixed bottom-5 right-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={scrollToTop}
              className="bg-primary text-white px-4 py-2 rounded shadow-md"
            >
              Top
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to top</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
