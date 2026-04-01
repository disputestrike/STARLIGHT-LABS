/**
 * 20 static verification passes: migrations, HR/careers APIs, marketing shell, content gates.
 * Run: node scripts/verify-site-passes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function read(p) {
  return fs.readFileSync(path.join(root, p), "utf8");
}

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

let pass = 0;
function check(name, ok) {
  pass += 1;
  if (!ok) {
    console.error(`FAIL [${pass}/20] ${name}`);
    process.exit(1);
  }
  console.log(`OK   [${pass}/20] ${name}`);
}

// 1–20
check("prisma/schema.prisma exists", exists("prisma/schema.prisma"));
check("schema defines CareerApplication", read("prisma/schema.prisma").includes("model CareerApplication"));
check("at least one SQL migration present", fs.readdirSync(path.join(root, "prisma/migrations")).some((d) => d !== "migration_lock.toml"));

check("API careers apply route exists", exists("app/api/careers/apply/route.ts"));
check("Apply API uses Prisma / DB", read("app/api/careers/apply/route.ts").includes("prisma") && read("app/api/careers/apply/route.ts").includes("@/lib/db"));

check("jobs.ts defines compensationNgn on postings", read("lib/careers/jobs.ts").includes("compensationNgn"));
check("jobs include Nigerian Naira symbol", read("lib/careers/jobs.ts").includes("₦"));

check("MarketingShell has Employee footer label", read("components/marketing/MarketingShell.tsx").includes("Employee"));
check("MarketingShell has no App dashboard link", !read("components/marketing/MarketingShell.tsx").includes("App dashboard"));
check("MarketingShell does not pass showGoogleSignIn to FooterAccountLinks", !read("components/marketing/MarketingShell.tsx").includes("showGoogleSignIn"));

check("Site layout wraps MarketingShell without Google env gate", read("app/(site)/layout.tsx").includes("<MarketingShell>") && !read("app/(site)/layout.tsx").includes("showGoogleSignIn"));

const aboutTxt = read("app/(site)/about/page.tsx");
check("About page mentions Nigeria and 2020", aboutTxt.includes("Nigerian") && aboutTxt.includes("2020"));

check("NavDropdown component exists (dropdown behavior)", exists("components/marketing/NavDropdown.tsx"));

check("Careers index lists compensation in template", read("app/(site)/careers/page.tsx").includes("compensationNgn"));
check("Career detail shows compensation block", read("app/(site)/careers/[slug]/page.tsx").includes("Compensation"));

check("Case studies page has multiple anonymized stories", read("app/(site)/case-studies/page.tsx").includes("anonymized"));
check("Newsroom has multiple items", (read("app/(site)/news/page.tsx").match(/date:/g) || []).length >= 4);

check("Contact page exists for careers funnel", exists("app/(site)/contact/page.tsx"));
check("ApplyForm posts to careers API", read("components/marketing/ApplyForm.tsx").includes("/api/careers/apply"));

check("FooterAccountLinks: loading uses aria-busy, not raw Loading text", read("components/marketing/FooterAccountLinks.tsx").includes("aria-busy") && !read("components/marketing/FooterAccountLinks.tsx").includes("Loading"));

console.log("\nAll 20 passes succeeded.");
