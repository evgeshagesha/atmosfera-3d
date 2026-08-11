import type { LevelId } from "../types";

export interface GuideSection {
  title: string;
  text: string;
}

export interface PlanWeek {
  week: string;
  title: string;
  focus: string;
  actions: string[];
}

export interface ResultGuide {
  id: LevelId;
  title: string;
  number: string;
  range: string;
  kicker: string;
  hero: string;
  summary: string;
  task: string;
  indicators: string[];
  principles: GuideSection[];
  equipment: string[];
  sessionDuration: string;
  sessionsPerWeek: string;
  weeks: PlanWeek[];
  rules: string[];
  youtubeLead: string;
  consultationLead: string;
}
