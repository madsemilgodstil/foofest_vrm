import { getSchedule } from "@/lib/database";

const Schedule = async () => {
  // Hent schedule-data for alle tre scener
  const midgard = await getSchedule("Midgard");
  const vanaheim = await getSchedule("Vanaheim");
  const jotunheim = await getSchedule("Jotunheim");

  // const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  // Definer scenerne
  const stages = [
    { name: "Midgard", stageSchedule: midgard },
    { name: "Vanaheim", stageSchedule: vanaheim },
    { name: "Jotunheim", stageSchedule: jotunheim },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {stages.map(({ name, stageSchedule }) => (
        <div key={name} className="bg-gray-100 p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">{name}</h2>

          {/* {days.map((day) => ( */}
          {Object.keys(stageSchedule).map((day) => (
            //Har vi brugt i vores sten, saks, papir spil, det er der jeg har Object.keys fra
            <div key={day} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 capitalize">{day}</h3>
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
  );
};

export default Schedule;
