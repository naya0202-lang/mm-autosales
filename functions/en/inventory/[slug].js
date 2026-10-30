// GET /en/inventory/:slug — English vehicle page
import { renderVehicle } from "../../_vehicle.js";
export const onRequestGet = (ctx) => renderVehicle(ctx, "en");
