"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Schedule = ({ stages }) => {
  const [selectedGenre, setSelectedGenre] = useState(null); // State for filtering by genre
  const [selectedStage, setSelectedStage] = useState(null); // State for filtering by stage
  const [selectedBand, setSelectedBand] = useState(null); // State for selected band

  // Extract all unique days
  const allDays = [
    ...new Set(
      stages.flatMap(({ stageSchedule }) => Object.keys(stageSchedule))
    ),
  ];

  // Extract all unique genres, excluding "Unknown"
  const allGenres = [
    ...new Set(
      stages.flatMap(({ stageSchedule }) =>
        Object.values(stageSchedule).flatMap((day) =>
          day
            .map(({ genre }) => genre)
            .filter((genre) => genre && genre !== "Unknown")
        )
      )
    ),
  ];

  const handleStageFilter = (stageName) => {
    setSelectedStage(stageName === selectedStage ? null : stageName); // Toggle stage filter
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre); // Toggle genre filter
  };

  const scrollToDay = (day) => {
    const element = document.getElementById(day);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-4 lg:mx-24">
      {/* Buttons for each stage */}
      <div className="flex flex-wrap gap-3 mb-8 mt-14 justify-center">
        {stages.map(({ name }) => (
          <button
            key={name}
            onClick={() => handleStageFilter(name)}
            className={`px-4 py-1 rounded-full border ${
              selectedStage === name
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary hover:bg-black hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Buttons for each day */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {allDays.map((day) => (
          <button
            key={day}
            onClick={() => scrollToDay(day)}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-black border border-primary"
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      {/* Buttons for each genre */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreFilter(genre)}
            className={`px-4 py-1 rounded-full border ${
              selectedGenre === genre
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary hover:bg-black hover:text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Schedule grid */}
      <div
        className={`${
          selectedStage
            ? "flex justify-center items-center"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
        }`}
      >
        {stages
          .filter(({ name }) => !selectedStage || selectedStage === name) // Filter by selected stage
          .map(({ name, stageSchedule }) => (
            <div
              key={name}
              className={`p-2 rounded shadow bg-black border-darkorange border-2 ${
                selectedStage ? "w-full max-w-2xl" : ""
              }`}
            >
              <h2 className="text-md font-bold mb-2 text-white">{name}</h2>
              {Object.keys(stageSchedule).map((day) => {
                // Filter events for the day based on selected genre
                const filteredEvents = stageSchedule[day]?.filter(
                  ({ genre }) =>
                    (!selectedGenre || genre === selectedGenre) &&
                    genre !== "Unknown" // Exclude "Unknown"
                );

                // Skip the day if there are no events
                if (!filteredEvents || filteredEvents.length === 0) {
                  return null;
                }

                return (
                  <div key={day} id={day} className="mb-2">
                    <h3 className="text-sm font-semibold mb-1 capitalize text-primary">
                      {day}
                    </h3>
                    <div className="grid gap-1">
                      {filteredEvents.map(
                        (
                          {
                            start,
                            end,
                            act,
                            genre,
                            bio,
                            members,
                            logo,
                            logoCredits,
                          },
                          index
                        ) => (
                          <Sheet key={index}>
                            <SheetTrigger asChild>
                              <Card
                                onClick={() =>
                                  setSelectedBand({
                                    act,
                                    start,
                                    end,
                                    genre,
                                    bio,
                                    members,
                                    logo,
                                    logoCredits,
                                  })
                                }
                                className="hover:scale-105 transition ease-in-out duration-300 border border-darkorange rounded-[10px] cursor-pointer"
                              >
                                <CardHeader className="p-2">
                                  <CardTitle className="text-xs font-bold flex justify-between items-center">
                                    <span>{act}</span>
                                    <span className="text-gray-500 text-[10px]">
                                      {start} - {end}
                                    </span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                  {genre && (
                                    <p className="text-gray-400 italic text-[10px]">
                                      {genre}
                                    </p>
                                  )}
                                </CardContent>
                              </Card>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                {/* Band Logo */}
                                {selectedBand?.logo && (
                                  <div className="flex justify-center my-4">
                                    <Avatar className="w-32 h-32">
                                      <AvatarImage
                                        src={selectedBand.logo}
                                        alt={selectedBand.act}
                                      />
                                      <AvatarFallback>
                                        {selectedBand.act}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                )}

                                {/* Band Name */}
                                <SheetTitle className="text-lg font-bold">
                                  {selectedBand?.act || ""}
                                </SheetTitle>

                                {/* Band Time */}
                                <SheetDescription className="text-sm">
                                  Time: {selectedBand?.start} -{" "}
                                  {selectedBand?.end}
                                </SheetDescription>

                                {/* Band Genre */}
                                {selectedBand?.genre && (
                                  <SheetDescription className="italic text-gray-400">
                                    Genre: {selectedBand.genre}
                                  </SheetDescription>
                                )}

                                {/* Band Bio */}
                                {selectedBand?.bio && (
                                  <SheetDescription className="text-sm my-2">
                                    {selectedBand.bio}
                                  </SheetDescription>
                                )}

                                {/* Band Members */}
                                {selectedBand?.members && (
                                  <SheetDescription className="text-sm my-2">
                                    <strong>Members:</strong>{" "}
                                    {Array.isArray(selectedBand.members)
                                      ? selectedBand.members.join(", ")
                                      : selectedBand.members}
                                  </SheetDescription>
                                )}

                                {/* Logo Credits */}
                                {selectedBand?.logoCredits && (
                                  <SheetDescription className="text-xs text-gray-500 text-center mt-4">
                                    {selectedBand.logoCredits}
                                  </SheetDescription>
                                )}
                              </SheetHeader>
                            </SheetContent>
                          </Sheet>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Schedule;
