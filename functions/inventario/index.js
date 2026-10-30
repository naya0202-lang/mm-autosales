// GET /inventario — the list lives on the homepage
export const onRequest = ({ request }) => Response.redirect(new URL("/#inventory", request.url).toString(), 301);
