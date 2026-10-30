// Repo files that Cloudflare Pages would otherwise publish as-is
const PRIVATE = /^\/(handoff\.md|readme\.txt|\.gitignore|_routes\.json|functions\/.*)$/i;

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (PRIVATE.test(url.pathname)) return new Response("Not found", { status: 404 });
  const res = await next();
  // keep *.pages.dev preview copies out of Google; only the real domain should be indexed
  if (url.hostname.endsWith(".pages.dev")) {
    const r = new Response(res.body, res);
    r.headers.set("X-Robots-Tag", "noindex");
    return r;
  }
  return res;
}
