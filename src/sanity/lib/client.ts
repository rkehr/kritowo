// sanity/lib/client.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-09-20", // use today's date or '2021-10-21'
  useCdn: true, // `false` if you want fresh data
});
