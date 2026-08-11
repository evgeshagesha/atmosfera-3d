import assert from "node:assert/strict";
import test from "node:test";
import { QUESTIONS } from "../features/body-test/questions";
import { calculateResult } from "../features/body-test/scoring";
import type { TestAnswers } from "../features/body-test/types";

function answersBy(selector: "max" | "unknown"): TestAnswers {
  return Object.fromEntries(QUESTIONS.map((question) => {
    if (question.type === "safety") return [question.id, "clear"];
    if (selector === "unknown") {
      const unknown = question.options?.find((option) => option.id === "unknown");
      if (unknown) return [question.id, unknown.id];
    }
    const best = [...(question.options ?? [])].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];
    return [question.id, best.id];
  }));
}

test("maximum functional answers produce 100 and progression", () => {
  const result = calculateResult(answersBy("max"), { sessionId: "max" });
  assert.equal(result.total, 100);
  assert.equal(result.level, "progression");
  assert.equal(result.safetyFlags.length, 0);
});

test("skipped video assessment still produces a complete result", () => {
  const result = calculateResult(answersBy("unknown"), { sessionId: "skip" });
  assert.equal(result.total, 50);
  assert.equal(result.level, "base");
  assert.equal(result.zones.length, 5);
});

test("hard safety flag is preserved and caps the level", () => {
  const answers = answersBy("max");
  answers.safety_after = "dizzy";
  const result = calculateResult(answers, { sessionId: "safety" });
  assert.equal(result.total, 100);
  assert.equal(result.rawLevel, "progression");
  assert.equal(result.level, "base");
  assert.deepEqual(result.safetyFlags, ["dizziness"]);
});

test("background pain only caps progression to integration", () => {
  const answers = answersBy("max");
  answers.safety_now = "pain";
  const result = calculateResult(answers, { sessionId: "pain" });
  assert.equal(result.level, "integration");
  assert.deepEqual(result.safetyFlags, ["pain"]);
});
