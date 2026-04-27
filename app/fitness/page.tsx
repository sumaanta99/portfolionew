import { FitnessClient } from "@/components/FitnessClient";

export const metadata = {
  title: "Fitness — Sumaanta Munde",
  description: "Live fitness stats synced from Fitbit — steps, sleep, and heart rate.",
};

export const revalidate = 3600;

async function getFitbitData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/fitbit/data`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function FitnessPage() {
  const data = await getFitbitData();

  return (
    <div className="pt-14">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            Fitness
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-800 leading-none text-ink mb-4">
            By the numbers
          </h1>
          <p className="font-body text-base text-muted max-w-xl">
            Live stats synced from my Fitbit. Because shipping code isn't the only
            metric I track.
          </p>
        </div>

        <FitnessClient data={data} />
      </div>
    </div>
  );
}
