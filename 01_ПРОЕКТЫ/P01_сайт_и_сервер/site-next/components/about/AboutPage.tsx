import SitePage from "@/components/site/SitePage";
import { ABOUT_ROUTE } from "@/lib/about";
import { getAboutStylesheets } from "@/lib/about/stylesheets";

/** About page (`/about`) — 28 React blocks, see `lib/about/config.ts`. */
export default function AboutPage() {
  return <SitePage route={ABOUT_ROUTE} stylesheets={getAboutStylesheets()} />;
}
