// GET /inventario/:slug — Spanish vehicle page
import { renderVehicle } from "../_vehicle.js";
export const onRequestGet = (ctx) => renderVehicle(ctx, "es");
