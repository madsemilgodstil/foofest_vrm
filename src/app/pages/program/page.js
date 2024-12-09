import Schedule from "@/components/schedule/Schedule";
import { getSchedule } from "@/lib/database";

export default async function ProgramPage() {
  const midgard = await getSchedule("Midgard");
  const vanaheim = await getSchedule("Vanaheim");
  const jotunheim = await getSchedule("Jotunheim");

  const stages = [
    { name: "Midgard", stageSchedule: midgard },
    { name: "Vanaheim", stageSchedule: vanaheim },
    { name: "Jotunheim", stageSchedule: jotunheim }
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-7xl font-bold mt-12">Festival Program</h1>
        <Schedule stages={stages} />
      </div>
    </>
  );
}
