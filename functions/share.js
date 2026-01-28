export async function onRequest({ request }) {
  const url = new URL(request.url);

  const temp = (url.searchParams.get("temp") || "??").slice(0, 6);
  const verdict = (url.searchParams.get("verdict") || "Maybe").slice(0, 16);
  const place = (url.searchParams.get("place") || "Somewhere").slice(0, 60);

  const title = "hoodieornah";
  const desc = `${verdict.toUpperCase()} - feels like ${temp}°F in ${place}.`;

  const og = new URL("/og.png", url.origin);

  // Humans should land on the app
  const redirectTo = url.origin + "/";

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>

  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.toString()}">
  <meta property="og:image" content="${og.toString()}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${og.toString()}">

  <meta http-equiv="refresh" content="0;url=${redirectTo}">
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
