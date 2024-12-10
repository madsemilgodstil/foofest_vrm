import { getBands } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getImageUrl(band) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/logos/";
  if (band.logo.startsWith("https://")) {
    return band.logo;
  } else {
    return `${baseUrl}/${band.logo}`;
  }
}

async function displayArtists() {
  const bands = await getBands();

  return (
    <div className="px-10">
      <div className="flex flex-col items-center justify-center m-20">
        <h1 className="text-7xl font-bold mt-12">All Artists</h1>
      </div>
      <div className="grid grid-cols-4 gap-8 mx-24">
        {bands.map((band) => (
          <Sheet key={band.id}>
            <SheetTrigger asChild>
              <Card className="hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
                <CardContent className="flex justify-center p-0">
                  <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
                    <Avatar className="absolute inset-0 w-full h-full">
                      <AvatarImage
                        src={getImageUrl(band)}
                        alt={band.name}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>{band.name}</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
                <CardHeader className="py-4 px-2">
                  <CardTitle className="text-center text-xl text-primary">
                    {band.name}
                  </CardTitle>
                  <CardDescription className="text-center text-white font-bold">
                    {band.genre}
                  </CardDescription>
                </CardHeader>
              </Card>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-center">{band.name}</SheetTitle>
                <SheetDescription className="text-center">
                  {band.genre}
                </SheetDescription>
                <SheetDescription className="text-center">
                  {Array.isArray(band.members)
                    ? band.members.join(", ")
                    : band.members}
                </SheetDescription>
                <SheetDescription className="flex justify-center py-2">
                  <Avatar className="w-48 h-48">
                    <AvatarImage src={getImageUrl(band)} alt={band.name} />
                    <AvatarFallback>{band.name}</AvatarFallback>
                  </Avatar>
                </SheetDescription>
                <SheetDescription className="flex justify-center">
                  <p className="text-center py-2 text-xs">{band.logoCredits}</p>
                </SheetDescription>
                <SheetDescription className="py-2">{band.bio}</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}

export default displayArtists;
