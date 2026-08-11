export type ZoneId = "breath" | "posture" | "pelvis" | "movement" | "legs";
export type LevelId = "base" | "integration" | "progression";

export type AnswerValue = string | string[] | number;

export interface QuestionOption {
  id: string;
  label: string;
  detail?: string;
  score?: number;
  safetyFlag?: SafetyFlagId;
  asymmetry?: boolean;
}

export type SafetyFlagId =
  | "pain"
  | "sharp_pain"
  | "numbness"
  | "dizziness"
  | "loss_of_control";

export interface BaseQuestion {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  zone?: ZoneId;
  maxScore?: number;
  options?: QuestionOption[];
  helperText?: string;
}

export type Question = BaseQuestion &
  (
    | { type: "single" | "safety" | "multi-safety" | "body-map" }
    | { type: "scale"; min: number; max: number; minLabel: string; maxLabel: string }
    | { type: "video"; videoId: VideoId; instructions: string[]; watchFor: string }
  );

export type VideoId =
  | "breath360"
  | "pelvicTilt"
  | "overheadSquat"
  | "ankleWall"
  | "wallArms"
  | "singleLeg";

export interface TestAnswers { [questionId: string]: AnswerValue }

export interface ZoneScore {
  id: ZoneId;
  label: string;
  score: number;
  max: 20;
}

export interface TestResult {
  total: number;
  level: LevelId;
  rawLevel: LevelId;
  zones: ZoneScore[];
  priorityZone: ZoneId;
  asymmetry: boolean;
  safetyFlags: SafetyFlagId[];
  completedAt: string;
  sessionId: string;
  questionnaireId?: string;
  attribution?: Record<string, string>;
}

export interface TestDraft {
  version: number;
  step: number;
  answers: TestAnswers;
  sessionId: string;
  questionnaireId?: string;
  utm: Record<string, string>;
  startedAt: string;
}
