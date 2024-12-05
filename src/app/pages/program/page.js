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
      <div>
        <h1>Festival Program</h1>
        <Schedule stages={stages} />
      </div>
    </>
  );
}
