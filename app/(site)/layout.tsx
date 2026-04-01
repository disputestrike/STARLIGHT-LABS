import { MarketingShell } from "@/components/marketing/MarketingShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const showGoogleSignIn =
    Boolean(process.env.GOOGLE_CLIENT_ID?.length) &&
    Boolean(process.env.GOOGLE_CLIENT_SECRET?.length);

  return <MarketingShell showGoogleSignIn={showGoogleSignIn}>{children}</MarketingShell>;
}
