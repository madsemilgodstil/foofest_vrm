"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getBands } from "@/lib/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getImageUrl(band) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/logos/";
  if (band.logo?.startsWith("https://")) {
    return band.logo;
  } else {
    return `${baseUrl}${band.logo}`;
  }
}

const Schedule = ({ stages }) => {
  const [bands, setBands] = useState([]); // State to store fetched bands
  const [selectedGenre, setSelectedGenre] = useState(null); // State for filtering by genre
  const [selectedStage, setSelectedStage] = useState(null); // State for filtering by stage

  // Fetch bands data once
  useEffect(() => {
    const fetchBands = async () => {
      try {
        const bandData = await getBands();
        setBands(bandData);
      } catch (error) {
        console.error("Error fetching bands:", error);
      }
    };
    fetchBands();
  }, []);

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
                      {filteredEvents.map((event, index) => {
                        // Find detailed band info from fetched bands
                        const bandDetails = bands.find(
                          (band) =>
                            band.name.toLowerCase() === event.act.toLowerCase()
                        );

                        return (
                          <Card
                            key={index}
                            className="hover:scale-105 transition ease-in-out duration-300 border border-darkorange rounded-[10px]"
                          >
                            <CardHeader className="p-2">
                              <CardTitle className="text-xs font-bold flex justify-between items-center">
                                <span>{event.act}</span>
                                <span className="text-gray-500 text-[10px]">
                                  {event.start} - {event.end}
                                </span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                              {event.genre && (
                                <CardDescription className="text-gray-400 italic text-[10px]">
                                  {event.genre}
                                </CardDescription>
                              )}
                            </CardContent>
                            {/* Optional: Display basic band details inline */}
                            {bandDetails && (
                              <div className="p-2">
                                {bandDetails.logo && (
                                  <Avatar className="w-24 h-24 mx-auto">
                                    <AvatarImage
                                      src={getImageUrl(bandDetails)}
                                      alt={bandDetails.name}
                                    />
                                    <AvatarFallback>
                                      {bandDetails.name}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <h4 className="text-center text-sm font-semibold text-primary">
                                  {bandDetails.name}
                                </h4>
                                {bandDetails.genre && (
                                  <p className="text-center text-xs text-gray-400">
                                    {bandDetails.genre}
                                  </p>
                                )}
                              </div>
                            )}
                          </Card>
                        );
                      })}
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
