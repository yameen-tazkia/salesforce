import { getStore, type SearchHistoryEntry } from "@/lib/store";
import { generateId } from "@/lib/utils";

/** Per-user workspace: saved accounts and search history. */

export function getSavedAccountIds(userId: string): string[] {
  return getStore().workspace.saved.get(userId) ?? [];
}

export function saveAccount(userId: string, accountId: string): string[] {
  const { saved } = getStore().workspace;
  const list = saved.get(userId) ?? [];
  if (!list.includes(accountId)) list.unshift(accountId);
  saved.set(userId, list);
  return list;
}

export function unsaveAccount(userId: string, accountId: string): string[] {
  const { saved } = getStore().workspace;
  const list = (saved.get(userId) ?? []).filter((id) => id !== accountId);
  saved.set(userId, list);
  return list;
}

export function getSearchHistory(userId: string): SearchHistoryEntry[] {
  return getStore().workspace.history.get(userId) ?? [];
}

export function recordSearch(
  userId: string,
  summary: string,
  query: Record<string, string>,
): void {
  const { history } = getStore().workspace;
  const list = history.get(userId) ?? [];
  // Collapse consecutive duplicates so paging/refreshes don't spam history.
  if (list[0]?.summary === summary) return;
  list.unshift({
    id: generateId("srch"),
    userId,
    summary,
    query,
    at: new Date().toISOString(),
  });
  history.set(userId, list.slice(0, 50));
}
