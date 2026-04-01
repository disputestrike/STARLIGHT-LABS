/**
 * Applies Prisma migrations to your connected Postgres (DATABASE_URL) and regenerates the client.
 * Run from repo root:  npm run db:setup
 * Requires: DATABASE_URL in .env or environment.
 *
 * This creates all tables defined under prisma/migrations — including CareerApplication, ContactSubmission, User, etc.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(label, command, args) {
  console.log(`\n→ ${label}`);
  const r = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });
  if (r.status !== 0 && r.status !== null) {
    process.exit(r.status);
  }
}

console.log("Starlight Labs — database setup");
console.log("Using DATABASE_URL from your environment (.env / .env.local).");

run("prisma migrate deploy (creates & updates tables)", "npx", ["prisma", "migrate", "deploy"]);
run("prisma generate (client)", "npx", ["prisma", "generate"]);

console.log("\nDone. Tables should match prisma/schema.prisma. Optional: npm run db:seed\n");
