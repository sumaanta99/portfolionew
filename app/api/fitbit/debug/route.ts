import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.FITBIT_ACCESS_TOKEN;

  const res = await fetch(
    "https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();

  return NextResponse.json({
    status: res.status,
    data,
  });
}
