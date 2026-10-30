// GET /en/ — English homepage
import { renderHome } from "../_home.js";
export const onRequestGet = (ctx) => {
  const url = new URL(ctx.request.url);
  if (url.pathname === "/en") return Response.redirect(new URL("/en/", url).toString(), 301);
  return renderHome(ctx, "en");
};
