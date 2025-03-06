import { revalidateTag } from "next/cache";

let requestCount = 0;

export async function GET() {
  requestCount++;
  console.log(`API HIT [${requestCount}]: Fetching users from /api/users`);

  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
    { id: 4, name: "David Wilson", email: "david@example.com" },
    { id: 5, name: "Emma Davis", email: "emma@example.com" },
  ];

  return Response.json(users, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate",
    },
  });
}

// API to manually revalidate the cache
export async function POST() {
  console.log("Cache PURGED: Triggered revalidateTag('users')");
  revalidateTag("users"); // Clear cache for this tag
  return Response.json({ message: "Cache purged successfully!" });
}
