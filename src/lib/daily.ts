import { getCollection } from "astro:content";
import covers from "../data/daily-covers.json";
import { parseDailyEditions } from "./daily-presentation.mjs";

export const getReadingEditions = (entry: { body?: string }) => parseDailyEditions(entry.body ?? "", covers);

export async function getDailyEntries() {
  return (await getCollection("daily", ({ data }) => data.status === "published" || (import.meta.env.DEV && data.status === "draft")))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}
