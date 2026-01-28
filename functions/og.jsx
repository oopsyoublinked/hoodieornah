import { ImageResponse } from "@cloudflare/og";

export const config = {
  runtime: "edge"
};

function clean(s, fallback = "") {
  if (!s) return fallback;
  return String(s).slice(0, 60);
}

function verdictStyle(verdictRaw) {
  const v = (verdictRaw || "").toLowerCase();
  if (v.includes("hoodie")) return { color: "#7aa0ff", label: "HOODIE" };
  if (v.includes("nah")) return { color: "#78ffbe", label: "NAH" };
  return { color: "#f4f4f6", label: "MAYBE" };
}

export async function onRequest({ request }) {
  const url = new URL(request.url);

  const temp = clean(url.searchParams.get("temp"), "??");
  const place = clean(url.searchParams.get("place"), "");
  const verdictRaw = clean(url.searchParams.get("verdict"), "Maybe");

  const { color, label } = verdictStyle(verdictRaw);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0f",
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
        }}
      >
        <div
          style={{
            width: "1060px",
            height: "460px",
            borderRadius: "36px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "48px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div style={{ fontSize: "34px", color: "#f4f4f6", opacity: 0.9 }}>
            hoodieornah
          </div>

          <div>
            <div
              style={{
                fontSize: "120px",
                fontWeight: 900,
                color,
                letterSpacing: "2px"
              }}
            >
              {label}
            </div>

            <div
              style={{
                fontSize: "54px",
                fontWeight: 800,
                color: "#f4f4f6",
                marginTop: "10px"
              }}
            >
              Feels like {temp}°F
            </div>

            {place && (
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: 600,
                  color: "#b9b9c2",
                  marginTop: "8px"
                }}
              >
                in {place}
              </div>
            )}
          </div>

          <div style={{ fontSize: "28px", color: "#b9b9c2" }}>
            Settle the daily hoodie debate.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
