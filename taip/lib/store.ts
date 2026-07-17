import type { Account } from "@/modules/accounts/types";
import { SEED_ACCOUNTS } from "@/data/seed/accounts";
import { SEED_USERS, type SeedUser } from "@/data/seed/users";

/**
 * In-memory data store, seeded on first access.
 *
 * This is the demo persistence layer behind the repository interfaces.
 * Swapping to Postgres/Prisma (or any store) means re-implementing the
 * repositories in `modules/x/repository.ts` — nothing above them changes.
 * State is cached on `globalThis` so it survives Next.js dev HMR reloads.
 */

export interface SearchHistoryEntry {
  id: string;
  userId: string;
  summary: string;
  query: Record<string, string>;
  at: string; // ISO datetime
}

export interface WorkspaceState {
  /** userId → saved account ids (insertion-ordered). */
  saved: Map<string, string[]>;
  /** userId → search history, newest first. */
  history: Map<string, SearchHistoryEntry[]>;
}

export interface Store {
  accounts: Account[];
  users: SeedUser[];
  workspace: WorkspaceState;
}

declare global {
  // eslint-disable-next-line no-var
  var __taipStore: Store | undefined;
}

function createStore(): Store {
  return {
    // Deep-clone the seeds so runtime mutations never touch module constants.
    accounts: structuredClone(SEED_ACCOUNTS),
    users: [...SEED_USERS],
    workspace: {
      saved: new Map([
        ["u_amira", ["acc_almarjan", "acc_alqimma", "acc_dohacrown"]],
        ["u_omar", ["acc_alnukhba", "acc_gulfcrown", "acc_riyada"]],
      ]),
      history: new Map(),
    },
  };
}

export function getStore(): Store {
  if (!globalThis.__taipStore) {
    globalThis.__taipStore = createStore();
  }
  return globalThis.__taipStore;
}
