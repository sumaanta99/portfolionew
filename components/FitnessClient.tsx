"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";

interface FitnessData {
  profile: { name: string; avatar: string; memberSince: string };
  today: { steps: number; sleep: number; heartRate: number | null; stepsGoal: number };
  weekly: {
    avgSteps: number;
    steps: Array<{ date: string; value: number }>;
    sleep: Array<{ date: string; hours: number; efficiency: number }>;
    heartRate: Array<{ date: string; restingHR: number | null }>;
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { weekday: "short" }).slice(0, 3);
}

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border p-6 ${
        accent ? "bg-ink border-ink text-paper" : "border-subtle"
      }`}
    >
      <p className={`font-mono text-xs tracking-widest uppercase mb-3 ${accent ? "text-accent" : "text-muted"}`}>
        {label}
      </p>
      <p className={`font-display text-4xl font-800 ${accent ? "text-paper" : "text-ink"}`}>
        {value}
      </p>
      {sub && (
        <p className={`font-mono text-xs mt-2 ${accent ? "text-muted" : "text-muted"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-ink text-paper font-mono text-xs px-3 py-2 border border-muted/20">
        <p className="text-muted mb-1">{label}</p>
        <p className="text-accent">{payload[0].value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function FitnessClient({ data }: { data: FitnessData | null }) {
  if (!data) {
    return (
      <div className="border border-subtle p-16 text-center">
        <p className="font-display text-2xl font-700 text-ink mb-3">
          Not connected yet
        </p>
        <p className="font-body text-sm text-muted mb-6 max-w-sm mx-auto">
          Visit{" "}
          <code className="font-mono text-xs bg-subtle px-1 py-0.5">
            /api/fitbit/auth
          </code>{" "}
          to connect your Fitbit account. You only need to do this once.
        </p>
        <a
          href="/api/fitbit/auth"
          className="inline-block font-mono text-sm bg-ink text-paper px-6 py-3 hover:bg-accent transition-colors"
        >
          Connect Fitbit →
        </a>
      </div>
    );
  }

  const { today, weekly } = data;
  const stepsProgress = Math.min((today.steps / today.stepsGoal) * 100, 100);
  const stepsData = weekly.steps.map((d) => ({
    day: formatDate(d.date),
    steps: d.value,
  }));
  const sleepData = weekly.sleep.map((d) => ({
    day: formatDate(d.date),
    hours: d.hours,
    efficiency: d.efficiency,
  }));
  const hrData = weekly.heartRate
    .filter((d) => d.restingHR)
    .map((d) => ({
      day: formatDate(d.date),
      bpm: d.restingHR,
    }));

  return (
    <div className="space-y-10">
      {/* Today's stats */}
      <div>
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
          Today
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Steps"
            value={today.steps.toLocaleString()}
            sub={`${Math.round(stepsProgress)}% of goal`}
            accent
          />
          <StatCard
            label="Sleep"
            value={`${today.sleep}h`}
            sub="last night"
          />
          <StatCard
            label="Resting HR"
            value={today.heartRate ? `${today.heartRate} bpm` : "—"}
            sub="heart rate"
          />
          <StatCard
            label="7d avg steps"
            value={weekly.avgSteps.toLocaleString()}
            sub="weekly average"
          />
        </div>
      </div>

      {/* Steps progress bar */}
      <div className="border border-subtle p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-xs text-muted uppercase tracking-widest">
            Daily goal progress
          </p>
          <p className="font-mono text-xs text-accent">
            {today.steps.toLocaleString()} / {today.stepsGoal.toLocaleString()}
          </p>
        </div>
        <div className="h-2 bg-subtle rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-1000"
            style={{ width: `${stepsProgress}%` }}
          />
        </div>
      </div>

      {/* Steps chart */}
      <div className="border border-subtle p-6">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          Steps — Last 7 days
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={stepsData} barSize={28}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontFamily: "DM Mono", fontSize: 10, fill: "#8A8680" }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#E8E3DA" }} />
            <ReferenceLine
              y={10000}
              stroke="#E8572A"
              strokeDasharray="3 3"
              strokeOpacity={0.4}
            />
            <Bar dataKey="steps" fill="#0D0D0D" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="font-mono text-xs text-muted mt-2">
          Dashed line = 10,000 step goal
        </p>
      </div>

      {/* Sleep chart */}
      {sleepData.length > 0 && (
        <div className="border border-subtle p-6">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            Sleep — Last 7 days
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={sleepData} barSize={28}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontFamily: "DM Mono", fontSize: 10, fill: "#8A8680" }}
              />
              <YAxis hide domain={[0, 10]} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#E8E3DA" }} />
              <ReferenceLine
                y={8}
                stroke="#E8572A"
                strokeDasharray="3 3"
                strokeOpacity={0.4}
              />
              <Bar dataKey="hours" fill="#0D0D0D" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="font-mono text-xs text-muted mt-2">
            Dashed line = 8h recommended
          </p>
        </div>
      )}

      {/* Heart rate chart */}
      {hrData.length > 0 && (
        <div className="border border-subtle p-6">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            Resting Heart Rate — Last 7 days
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={hrData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontFamily: "DM Mono", fontSize: 10, fill: "#8A8680" }}
              />
              <YAxis hide domain={["auto", "auto"]} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="bpm"
                stroke="#E8572A"
                strokeWidth={2}
                dot={{ fill: "#E8572A", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Footer note */}
      <div className="border-t border-subtle pt-6 flex items-center justify-between">
        <p className="font-mono text-xs text-muted">
          Synced from Fitbit · updates every hour
        </p>
        <span className="font-mono text-xs text-accent">
          ● Live
        </span>
      </div>
    </div>
  );
}
