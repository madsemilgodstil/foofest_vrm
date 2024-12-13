import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function HeroLanding() {
  return (
    <div className="relative h-screen">
      <h1 className="hidden">Hero Landing</h1>

      {/* Image Container */}
      <div className="relative h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Festival Image"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
      </div>

      {/* Overlay and Content Wrapper */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 px-4">
        <div className="flex flex-col items-center space-y-8 text-center mb-32 sm:mb-44">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary font-moiraione z-20">
            FooFest 2025
          </h2>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 z-20">
            {/* Line-up Button */}
            <Link href="/pages/artist">
              <Button
                variant="default"
                className="px-8 py-4 sm:px-12 sm:py-7 bg-black border border-primary text-white rounded-full hover:bg-primary"
              >
                Line-up
              </Button>
            </Link>
            {/* Tickets Button */}
            <Link href="/pages/booking">
              <Button
                variant="default"
                className="px-8 py-4 sm:px-12 sm:py-7 bg-black border border-primary text-white rounded-full hover:bg-primary"
              >
                Tickets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroLanding;
