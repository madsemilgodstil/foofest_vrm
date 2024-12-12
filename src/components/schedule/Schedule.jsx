"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCancelledEvents } from "@/lib/database";

const Schedule = ({ stages }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [cancelledActs, setCancelledActs] = useState([]); // State to store cancelled acts

  // Fetch cancelled acts
  useEffect(() => {
    const fetchCancelledEvents = async () => {
      try {
        const cancelled = await getCancelledEvents();
        setCancelledActs(
          cancelled.map((event) => event.act.toLowerCase()) // Normalize to lowercase for comparison
        );
      } catch (error) {
        console.error("Error fetching cancelled events:", error);
      }
    };

    fetchCancelledEvents();
  }, []);

  const handleStageFilter = (stageName) => {
    setSelectedStage(stageName === selectedStage ? null : stageName);
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  const scrollToDay = (day) => {
    const element = document.getElementById(day);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-4 lg:mx-24">
      {/* Stage buttons */}
      <div className="gap-6 mt-7 mb-20">
        <div className="flex flex-wrap gap-3 mb-8 justify-center font-oswald">
          {stages.map(({ name }) => (
            <button
              key={name}
              onClick={() => handleStageFilter(name)}
              className={`px-6 py-2 rounded-full border ${
                selectedStage === name
                  ? "bg-primary text-white border-primary"
                  : "bg-black text-white border-primary hover:bg-primary transition ease-out duration-200"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Day buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center font-oswald">
          {Object.keys(stages[0]?.stageSchedule || {}).map((day) => (
            <button
              key={day}
              onClick={() => scrollToDay(day)}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-black border border-primary transition ease-out duration-200"
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule grid */}
      <div
        className={`${
          selectedStage
            ? "flex justify-center items-center"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6"
        }`}
      >
        {stages
          .filter(({ name }) => !selectedStage || selectedStage === name)
          .map(({ name, stageSchedule }) => (
            <div
              key={name}
              className={`rounded-xl shadow bg-black border-darkorange border-2 text-center p-8 mb-8 ${
                selectedStage ? "w-full max-w-7xl" : ""
              }`}
            >
              <h2 className="text-md text-3xl font-bold mb-8 text-white font-oswald">
                {name}
              </h2>
              {Object.keys(stageSchedule).map((day) => (
                <div key={day} id={day} className="mb-2">
                  <h3 className="text-lg font-semibold mb-1 capitalize text-primary">
                    {day}
                  </h3>
                  <div className="grid gap-1">
                    {stageSchedule[day]?.map(
                      ({ start, end, act, genre }, index) => {
                        const isCancelled = cancelledActs.includes(
                          act.toLowerCase()
                        );

                        return (
                          <Card
                            key={index}
                            className={`transition ease-in-out duration-300 border rounded-[10px] ${
                              isCancelled
                                ? "border-red-500 bg-red-100 text-red-700"
                                : "border-darkorange hover:border-primary hover:text-primary"
                            }`}
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
                              {isCancelled ? (
                                <p className="text-red-600 font-semibold">
                                  Cancelled
                                </p>
                              ) : (
                                genre && (
                                  <p className="text-gray-400 italic text-[10px]">
                                    {genre}
                                  </p>
                                )
                              )}
                            </CardContent>
                          </Card>
                        );
                      }
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Schedule;
