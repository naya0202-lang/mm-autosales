// GET /en/inventory — the list lives on the homepage
export const onRequest = ({ request }) => Response.redirect(new URL("/en/#inventory", request.url).toString(), 301);
