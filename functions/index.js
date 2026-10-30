// GET / — Spanish homepage
import { renderHome } from "./_home.js";
export const onRequestGet = (ctx) => renderHome(ctx, "es");
