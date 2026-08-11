import type { Metadata } from "next";
import { ResultGuidePage } from "@/features/body-test/results/ResultGuidePage";

export const metadata: Metadata = { title: "Результат: Интеграция | EG", robots: { index: false, follow: false } };
export default function IntegrationResultPage() { return <ResultGuidePage level="integration" />; }
