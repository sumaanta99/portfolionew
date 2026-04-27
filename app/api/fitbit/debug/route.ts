import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasClientId: !!process.env.FITBIT_CLIENT_ID,
    hasClientSecret: !!process.env.FITBIT_CLIENT_SECRET,
    hasAccessToken: !!process.env.FITBIT_ACCESS_TOKEN,
    hasRefreshToken: !!process.env.FITBIT_REFRESH_TOKEN,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    accessTokenPreview: process.env.FITBIT_ACCESS_TOKEN?.slice(0, 20) + "...",
  });
}
