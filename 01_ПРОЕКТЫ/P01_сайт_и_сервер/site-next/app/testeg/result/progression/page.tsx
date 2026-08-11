import type { Metadata } from "next";
import { ResultGuidePage } from "@/features/body-test/results/ResultGuidePage";

export const metadata: Metadata = { title: "Результат: Прогрессия | EG", robots: { index: false, follow: false } };
export default function ProgressionResultPage() { return <ResultGuidePage level="progression" />; }
