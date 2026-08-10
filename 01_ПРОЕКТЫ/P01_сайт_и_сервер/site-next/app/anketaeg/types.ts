export type AnswerValue =
  | string
  | string[]
  | number
  | Record<string, number>
  | boolean;

export type AnketaAnswers = Record<string, AnswerValue | undefined>;

/** Alias used by question showIf helpers */
export type Answers = AnketaAnswers;

export type QuestionOption = {
  label: string;
  value: string;
  hint?: string;
};

export type QuestionType =
  | "text"
  | "textarea"
  | "single"
  | "multi"
  | "scale"
  | "matrix"
  | "consent";

export type Question = {
  id: string;
  section: string;
  kicker?: string;
  title: string;
  description?: string;
  type: QuestionType;
  required?: boolean;
  optionalLabel?: string;
  placeholder?: string;
  options?: QuestionOption[];
  maxSelections?: number;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  rows?: { id: string; label: string }[];
  autoAdvance?: boolean;
  showIf?: (answers: Answers) => boolean;
};

export type LeadTemperature = "HOT" | "WARM" | "COLD";

export type LeadScoreResult = {
  score: number;
  segment: LeadTemperature;
};

export type AnketaUtm = Partial<
  Record<
    "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term",
    string
  >
>;

export type AnketaMeta = {
  submittedAt: string;
  page: string;
  referrer: string | null;
  utm: AnketaUtm;
  userAgent?: string;
  startedAt?: string | null;
};

export type SubmissionPayload = {
  answers: AnketaAnswers;
  company_website?: string;
  meta: AnketaMeta;
  /** Client may send; server recalculates and ignores trust */
  lead?: LeadScoreResult;
};
