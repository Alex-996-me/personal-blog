import { getSearchEntries } from "../lib/blog";

export async function GET() {
  const entries = await getSearchEntries();

  return new Response(JSON.stringify(entries), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=600",
    },
  });
}
