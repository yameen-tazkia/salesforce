import { getStore } from "@/lib/store";
import type { Account, Note } from "./types";

/**
 * Account repository — the only code that touches the store directly.
 * Replace this file's internals to move to a real database.
 */

export function findAllAccounts(): Account[] {
  return getStore().accounts;
}

export function findAccountById(id: string): Account | undefined {
  return getStore().accounts.find((a) => a.id === id);
}

export function updateAccount(
  id: string,
  patch: Partial<
    Pick<Account, "pipelineStage" | "ownerId" | "ownerName" | "nextFollowUpAt" | "lastResearchedAt">
  >,
): Account | undefined {
  const account = findAccountById(id);
  if (!account) return undefined;
  Object.assign(account, patch);
  return account;
}

export function addNote(id: string, note: Note): Account | undefined {
  const account = findAccountById(id);
  if (!account) return undefined;
  account.notes.unshift(note);
  return account;
}

export function addTag(id: string, tag: string): Account | undefined {
  const account = findAccountById(id);
  if (!account) return undefined;
  const clean = tag.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 40);
  if (clean && !account.tags.includes(clean)) account.tags.push(clean);
  return account;
}

export function removeTag(id: string, tag: string): Account | undefined {
  const account = findAccountById(id);
  if (!account) return undefined;
  account.tags = account.tags.filter((t) => t !== tag);
  return account;
}
