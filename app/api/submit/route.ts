import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, timestamp } = body || {}

    if (!name || !email || !phone || !service) {
      return new Response(JSON.stringify({ status: "error", message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const scriptUrl = process.env.APPS_SCRIPT_URL
    if (!scriptUrl) {
      return new Response(JSON.stringify({ status: "error", message: "Apps Script URL not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Add a timeout to avoid hanging on cold starts
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25000)

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "AIVS-LABS-Submit/1.0 (+apps-script)",
      },
      body: JSON.stringify({
        timestamp: timestamp || new Date().toISOString(),
        name,
        email,
        phone,
        service,
        source: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "localhost",
      }),
      // Apps Script can be slow on first cold start
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout))

    const text = await response.text()
    let json: any = null
    try { json = JSON.parse(text) } catch {}

    if (!response.ok) {
      return new Response(JSON.stringify({
        status: "error",
        message: "Spreadsheet endpoint responded with an error",
        upstreamStatus: response.status,
        upstream: json || text,
      }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(json || { status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({
      status: "error",
      message: err?.name === "AbortError" ? "Upstream timed out" : (err?.message || "Unknown error"),
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}


