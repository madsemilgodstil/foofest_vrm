import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function HeroLanding() {
  return (
    <div className="relative">
      <h1 className="hidden">Hero Landing</h1>
      {/* Styled h2 */}
      <h2 className="absolute inset-x-0 top-[15%] text-center text-5xl sm:text-7xl lg:text-9xl font-black text-white z-10 font-moiraione">
        FooFest 2025
      </h2>
      {/* Image Container */}
      <div className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Festival Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      {/* Button Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-[10%]">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Line-up Button */}
          <Link href="/pages/artist">
            <Button
              variant="default" // Brug variant "default" til at få bg-primary og text-white
              className="px-10 py-2 rounded-full hover:opacity-85"
            >
              Line-up
            </Button>
          </Link>
          {/* Tickets Button */}
          <Link href="/pages/booking">
            <Button
              variant="default" // Brug variant "default" til at få bg-primary og text-white
              className="px-10 py-2 rounded-full hover:opacity-85"
            >
              Tickets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroLanding;
