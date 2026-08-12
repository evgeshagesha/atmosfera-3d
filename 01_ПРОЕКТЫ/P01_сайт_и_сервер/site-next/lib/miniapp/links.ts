export const ANKETA_EG_URL = "https://eg.egoshev.ru/anketaeg";
export const STUDIO_BOOKING_URL = "https://egoshev.ru/anketa";
export const REVIEWS_URL =
  "https://yandex.ru/maps/org/atmosfera_zdorovya/182422254666?si=pv2az98d3qb5djzz748n8cv1vc";

export const LINKS = {
  anketa: ANKETA_EG_URL,
  studio: STUDIO_BOOKING_URL,
  reviews: REVIEWS_URL,
  instagram: "https://www.instagram.com/egoshev1",
  youtube: "https://www.youtube.com/@EGoshev",
  telegram: "https://t.me/EvgeniiGoshev",
} as const;

export function anketaUrlWithUtm(): string {
  const url = new URL(LINKS.anketa);
  url.searchParams.set("utm_source", "telegram");
  url.searchParams.set("utm_medium", "miniapp");
  url.searchParams.set("utm_campaign", "navigation");
  return url.toString();
}
