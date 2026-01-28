export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Optional params (never required)
  const temp = (url.searchParams.get("temp") || "").trim();
  const verdict = (url.searchParams.get("verdict") || "").trim();
  const place = (url.searchParams.get("place") || "").trim();

  const hasAny = Boolean(temp || verdict || place);

  const safeTemp = temp.replace(/[^0-9.-]/g, "");
  const safeVerdict = verdict.replace(/[^a-zA-Z ]/g, "").trim();
  const safePlace = place.replace(/[<>]/g, "").trim();

  const title = hasAny
    ? `Hoodie or Nah? ${safeVerdict ? safeVerdict.toUpperCase() : ""}`.trim()
    : "Hoodie or Nah?";

  const desc = hasAny
    ? `Feels like ${safeTemp || "?"}° in ${safePlace || "your area"}. Settle the hoodie debate in one click.`
    : "Settle the hoodie debate in one click based on the weather.";

  // Match exactly what FB fetched
  const ogUrl = url.origin + url.pathname + (url.search || "");
  const ogImage = `${url.origin}/og.png`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>

  <meta property="og:type" content="website" />
  <meta property="og:url" content="${escapeAttr(ogUrl)}" />
  <meta property="og:title" content="${escapeAttr(title)}" />
  <meta property="og:description" content="${escapeAttr(desc)}" />
  <meta property="og:image" content="${escapeAttr(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(title)}" />
  <meta name="twitter:description" content="${escapeAttr(desc)}" />
  <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
</head>
<body>
  <noscript><a href="/">Open hoodieornah</a></noscript>

  <script>
    (function () {
      var ua = (navigator.userAgent || "").toLowerCase();
      var isBot =
        ua.includes("facebookexternalhit") ||
        ua.includes("facebot") ||
        ua.includes("twitterbot") ||
        ua.includes("slackbot") ||
        ua.includes("discordbot") ||
        ua.includes("linkedinbot") ||
        ua.includes("whatsapp");

      if (!isBot) {
        var qs = ${JSON.stringify(url.searchParams.toString())};
        var dest = qs ? ("/?" + qs) : "/";
        window.location.replace(dest);
      }
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(s) {
  return escapeHtml(s);
}
