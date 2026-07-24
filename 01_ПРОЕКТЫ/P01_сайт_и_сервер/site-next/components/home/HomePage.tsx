import SitePage from "@/components/site/SitePage";
import { HOME_ROUTE } from "@/lib/home";
import { getHomeStylesheets } from "@/lib/home/stylesheets";

/**
 * Homepage (`/`).
 *
 * All 26 blocks are React components — see `lib/home/README.md`.
 * Legacy HTML fallback is not used for this route.
 */
export default function HomePage() {
  return <SitePage route={HOME_ROUTE} stylesheets={getHomeStylesheets()} />;
}
