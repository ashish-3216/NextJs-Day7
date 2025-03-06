import { revalidateTag } from "next/cache";

async function fetchUsers(cacheMode) {
  console.log(`Fetching users with cache mode: ${cacheMode}`);

  const response = await fetch("http://localhost:3000/api/users", {
    cache: cacheMode,
    next: { tags: ["users"] }, // Attach cache tag
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  if (cacheMode === "force-cache") {
    console.log("Cache HIT: Using cached response");
  } else {
    console.log("Cache MISS: Fetching fresh data");
  }

  return response.json();
}

export default async function Logger() {
  const cachedUsers = await fetchUsers("force-cache");
  const freshUsers = await fetchUsers("no-store");

  async function revalidateCache() {
    "use server"; // Next.js Server Action
    console.log("Triggering cache purge...");
    await fetch("http://localhost:3000/api/users", { method: "POST" }); // Call API to revalidate
  }

  return (
    <div>
      <h1>Memoization & Purging</h1>

      <h2>Server Component (force-cache with tag)</h2>
      <ul>
        {cachedUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Server Component (no-store, always fresh)</h2>
      <ul>
        {freshUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>

      <hr />

      <form action={revalidateCache}>
        <button type="submit">Purge Cache</button>
      </form>
    </div>
  );
}
