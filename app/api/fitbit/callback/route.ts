import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code received" }, { status: 400 });
  }

  const clientId = process.env.FITBIT_CLIENT_ID!;
  const clientSecret = process.env.FITBIT_CLIENT_SECRET!;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const redirectUri = `${baseUrl}/api/fitbit/callback`;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://api.fitbit.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json({ error: tokens }, { status: 500 });
  }

  // Show the tokens — user copies these into Vercel env vars
  return new NextResponse(
    `
    <html>
      <body style="font-family:monospace;padding:40px;background:#0D0D0D;color:#F5F0E8;max-width:700px;margin:auto">
        <h2 style="color:#E8572A">✅ Fitbit Connected!</h2>
        <p>Copy these two values into your <strong>Vercel Environment Variables</strong> (and your local <code>.env.local</code>):</p>
        <br/>
        <label style="color:#8A8680;font-size:12px">FITBIT_ACCESS_TOKEN</label>
        <pre style="background:#1a1a1a;padding:16px;word-break:break-all;color:#E8572A;font-size:11px">${tokens.access_token}</pre>
        <label style="color:#8A8680;font-size:12px">FITBIT_REFRESH_TOKEN</label>
        <pre style="background:#1a1a1a;padding:16px;word-break:break-all;color:#E8572A;font-size:11px">${tokens.refresh_token}</pre>
        <p style="color:#8A8680;font-size:13px">After adding to Vercel, redeploy your project. Access token expires in 8 hours but will auto-refresh.</p>
        <p style="color:#E8572A;font-size:13px">⚠️ Never commit these to git. Add them only via Vercel dashboard or .env.local</p>
      </body>
    </html>
    `,
    { headers: { "Content-Type": "text/html" } }
  );
}
