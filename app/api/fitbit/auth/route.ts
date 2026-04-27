import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.FITBIT_CLIENT_ID!;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const redirectUri = `${baseUrl}/api/fitbit/callback`;

  const scope = [
    "activity",
    "heartrate",
    "sleep",
    "profile",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    expires_in: "604800", // 1 week
  });

  const authUrl = `https://www.fitbit.com/oauth2/authorize?${params}`;
  return NextResponse.redirect(authUrl);
}
