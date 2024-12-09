"use client";

const Schedule = ({ stages }) => {
  const allDays = [
    ...new Set(
      stages.flatMap(({ stageSchedule }) => Object.keys(stageSchedule))
    )
  ];

  const scrollToDay = (day) => {
    const element = document.getElementById(day);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-24">
      {/* Buttons for each day */}
      <div className="flex gap-3 mb-8 mt-14 justify-center">
        {allDays.map((day) => (
          <button
            key={day}
            onClick={() => scrollToDay(day)}
            className=" px-10 py-2 bg-primary text-white rounded-full"
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {stages.map(({ name, stageSchedule }) => (
          <div
            key={name}
            className=" p-6 rounded shadow m-12 bg-darkGray gap-4"
          >
            <h2 className="text-xl font-bold mb-4">{name}</h2>
            {Object.keys(stageSchedule).map((day) => (
              <div key={day} id={day} className="mb-4">
                <h3 className="text-lg font-semibold mb-2 capitalize text-primary">
                  {day}
                </h3>
                <ul className="space-y-2">
                  {stageSchedule[day]?.map(({ start, end, act }, index) => (
                    <li key={index} className="text-sm">
                      <strong>
                        {start} - {end}
                      </strong>
                      - {act.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
