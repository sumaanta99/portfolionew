import { NextResponse } from "next/server";
import { fitbitFetch } from "@/lib/fitbit";

export const revalidate = 3600;

export async function GET() {
  try {
    const [activityRes, sleepRes, heartRes] = await Promise.allSettled([
      fitbitFetch(`/1/user/-/activities/steps/date/today/7d.json`),
      fitbitFetch(`/1.2/user/-/sleep/date/today/7d.json`),
      fitbitFetch(`/1/user/-/activities/heart/date/today/7d.json`),
    ]);

    const steps =
      activityRes.status === "fulfilled"
        ? activityRes.value["activities-steps"].map((d: any) => ({
            date: d.dateTime,
            value: parseInt(d.value),
          }))
        : [];

    const sleep =
      sleepRes.status === "fulfilled" && sleepRes.value.sleep
        ? sleepRes.value.sleep
            .slice(0, 7)
            .reverse()
            .map((s: any) => ({
              date: s.dateOfSleep,
              hours: parseFloat((s.minutesAsleep / 60).toFixed(1)),
              efficiency: s.efficiency,
            }))
        : [];

    const heartRate =
      heartRes.status === "fulfilled"
        ? heartRes.value["activities-heart"].map((d: any) => ({
            date: d.dateTime,
            restingHR: d.value?.restingHeartRate || null,
          }))
        : [];

    const todaySteps = steps[steps.length - 1]?.value || 0;
    const todaySleep = sleep[sleep.length - 1]?.hours || 0;
    const todayHR = heartRate[heartRate.length - 1]?.restingHR || null;
    const weekAvgSteps =
      steps.length > 0
        ? Math.round(
            steps.reduce((a: number, b: any) => a + b.value, 0) / steps.length
          )
        : 0;

    return NextResponse.json({
      profile: { name: "Sumaanta" },
      today: {
        steps: todaySteps,
        sleep: todaySleep,
        heartRate: todayHR,
        stepsGoal: 10000,
      },
      weekly: { avgSteps: weekAvgSteps, steps, sleep, heartRate },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch Fitbit data" },
      { status: 500 }
    );
  }
}
