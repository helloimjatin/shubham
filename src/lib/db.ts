let dbAvailable: boolean | null = null;

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  if (url.includes("placeholder") || url.includes("[PASSWORD]") || url.includes("[PROJECT]")) {
    return false;
  }
  return true;
}

export async function isDatabaseAvailable(
  check: () => Promise<unknown>
): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;
  if (dbAvailable !== null) return dbAvailable;

  try {
    await check();
    dbAvailable = true;
  } catch {
    dbAvailable = false;
  }

  return dbAvailable;
}

export function resetDatabaseAvailabilityCache(): void {
  dbAvailable = null;
}
