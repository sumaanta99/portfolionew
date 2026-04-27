export async function refreshFitbitToken(): Promise<string | null> {
  const clientId = process.env.FITBIT_CLIENT_ID!;
  const clientSecret = process.env.FITBIT_CLIENT_SECRET!;
  const refreshToken = process.env.FITBIT_REFRESH_TOKEN;

  if (!refreshToken) return null;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://api.fitbit.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();

  // Note: In production, persist the new tokens to your env via Vercel API
  // For now, the new access token is used for this request cycle
  return data.access_token;
}

export async function fitbitFetch(endpoint: string): Promise<any> {
  let token = process.env.FITBIT_ACCESS_TOKEN;

  const tryFetch = async (t: string) =>
    fetch(`https://api.fitbit.com${endpoint}`, {
      headers: { Authorization: `Bearer ${t}` },
      next: { revalidate: 3600 },
    });

  let res = await tryFetch(token!);

  // Token expired — try refresh
  if (res.status === 401) {
    const newToken = await refreshFitbitToken();
    if (!newToken) throw new Error("Could not refresh Fitbit token");
    res = await tryFetch(newToken);
  }

  if (!res.ok) throw new Error(`Fitbit API error: ${res.status}`);
  return res.json();
}
