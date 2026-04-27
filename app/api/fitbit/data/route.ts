import { NextResponse } from "next/server";
import { fitbitFetch } from "@/lib/fitbit";

export const revalidate = 3600; // cache 1 hour

function getLast7Days(): string[] {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [activityRes, sleepRes, heartRes, profileRes] = await Promise.all([
      fitbitFetch(`/1/user/-/activities/steps/date/today/7d.json`),
      fitbitFetch(`/1.2/user/-/sleep/date/today/7d.json`),
      fitbitFetch(`/1/user/-/activities/heart/date/today/7d.json`),
      fitbitFetch(`/1/user/-/profile.json`),
    ]);

    // Steps — last 7 days
    const steps = activityRes["activities-steps"].map((d: any) => ({
      date: d.dateTime,
      value: parseInt(d.value),
    }));

    // Sleep — last 7 days (minutes → hours)
    const sleep = sleepRes.sleep
      ? sleepRes.sleep.slice(0, 7).reverse().map((s: any) => ({
          date: s.dateOfSleep,
          hours: parseFloat((s.minutesAsleep / 60).toFixed(1)),
          efficiency: s.efficiency,
          stages: s.levels?.summary || null,
        }))
      : [];

    // Heart rate — last 7 days resting HR
    const heartRate = heartRes["activities-heart"].map((d: any) => ({
      date: d.dateTime,
      restingHR: d.value?.restingHeartRate || null,
    }));

    // Today's summary
    const todaySteps = steps[steps.length - 1]?.value || 0;
    const todaySleep = sleep[sleep.length - 1]?.hours || 0;
    const todayHR = heartRate[heartRate.length - 1]?.restingHR || null;
    const weekAvgSteps = Math.round(
      steps.reduce((a: number, b: any) => a + b.value, 0) / steps.length
    );

    return NextResponse.json({
      profile: {
        name: profileRes.user?.fullName || "Sumaanta",
        avatar: profileRes.user?.avatar150,
        memberSince: profileRes.user?.memberSince,
      },
      today: {
        steps: todaySteps,
        sleep: todaySleep,
        heartRate: todayHR,
        stepsGoal: 10000,
      },
      weekly: {
        avgSteps: weekAvgSteps,
        steps,
        sleep,
        heartRate,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch Fitbit data" },
      { status: 500 }
    );
  }
}
