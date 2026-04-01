import { MarketingShell } from "@/components/marketing/MarketingShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <MarketingShell>{children}</MarketingShell>;
}
