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

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: timestamp || new Date().toISOString(),
        name,
        email,
        phone,
        service,
      }),
      // Apps Script can be slow on first cold start
      cache: "no-store",
    })

    const text = await response.text()
    let json: any = null
    try { json = JSON.parse(text) } catch {}

    if (!response.ok) {
      return new Response(JSON.stringify({ status: "error", message: "Upstream failed", upstream: json || text }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(json || { status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ status: "error", message: err?.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}


