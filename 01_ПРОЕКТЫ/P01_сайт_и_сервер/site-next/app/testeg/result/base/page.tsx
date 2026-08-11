import type { Metadata } from "next";
import { ResultGuidePage } from "@/features/body-test/results/ResultGuidePage";

export const metadata: Metadata = { title: "Результат: База | EG", robots: { index: false, follow: false } };
export default function BaseResultPage() { return <ResultGuidePage level="base" />; }
