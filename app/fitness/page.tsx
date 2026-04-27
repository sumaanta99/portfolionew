import { FitnessClient } from "@/components/FitnessClient";

export const metadata = {
  title: "Fitness — Sumaanta Munde",
  description: "Live fitness stats synced from Fitbit.",
};

export const revalidate = 3600;

async function getFitbitData() {
  try {
    const res = await fetch(
      "https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json",
      {
        headers: { Authorization: `Bearer ${process.env.FITBIT_ACCESS_TOKEN}` },
        next: { revalidate: 3600 },
      }
    );

    const sleepRes = await fetch(
      "https://api.fitbit.com/1.2/user/-/sleep/date/today/7d.json",
      {
        headers: { Authorization: `Bearer ${process.env.FITBIT_ACCESS_TOKEN}` },
        next: { revalidate: 3600 },
      }
    );

    const heartRes = await fetch(
      "https://api.fitbit.com/1/user/-/activities/heart/date/today/7d.json",
      {
        headers: { Authorization: `Bearer ${process.env.FITBIT_ACCESS_TOKEN}` },
        next: { revalidate: 3600 },
      }
    );

    const stepsData = res.ok ? await res.json() : null;
    const sleepData = sleepRes.ok ? await sleepRes.json() : null;
    const heartData = heartRes.ok ? await heartRes.json() : null;

    if (!stepsData) return null;

    const steps = stepsData["activities-steps"].map((d: any) => ({
      date: d.dateTime,
      value: parseInt(d.value),
    }));

    const sleep = sleepData?.sleep
      ? sleepData.sleep
          .slice(0, 7)
          .reverse()
          .map((s: any) => ({
            date: s.dateOfSleep,
            hours: parseFloat((s.minutesAsleep / 60).toFixed(1)),
            efficiency: s.efficiency,
          }))
      : [];

    const heartRate = heartData
      ? heartData["activities-heart"].map((d: any) => ({
          date: d.dateTime,
          restingHR: d.value?.restingHeartRate || null,
        }))
      : [];

    const todaySteps = steps[steps.length - 1]?.value || 0;
    const todaySleep = sleep[sleep.length - 1]?.hours || 0;
    const todayHR = heartRate[heartRate.length - 1]?.restingHR || null;
    const weekAvgSteps = Math.round(
      steps.reduce((a: number, b: any) => a + b.value, 0) / steps.length
    );

    return {
      profile: { name: "Sumaanta" },
      today: {
        steps: todaySteps,
        sleep: todaySleep,
        heartRate: todayHR,
        stepsGoal: 10000,
      },
      weekly: { avgSteps: weekAvgSteps, steps, sleep, heartRate },
    };
  } catch {
    return null;
  }
}

export default async function FitnessPage() {
  const data = await getFitbitData();

  return (
    <div className="pt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            Fitness
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-800 leading-none text-ink mb-4">
            By the numbers
          </h1>
          <p className="font-body text-base text-muted max-w-xl">
            Live stats synced from my Fitbit. Because shipping code isn't the
            only metric I track.
          </p>
        </div>
        <FitnessClient data={data} />
      </div>
    </div>
  );
}
