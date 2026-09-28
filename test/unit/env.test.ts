import { describe, expect, it } from "vitest";

import { envEnabled } from "../../src/env.js";

describe("envEnabled", () => {
  it.each(["1", "true", "yes", "TRUE", "Yes", "yEs"])("reads %s as enabled", (value) => {
    expect(envEnabled(value)).toBe(true);
  });

  it.each(["0", "false", "no", "on", "y", "2", "truthy", "yes please"])("reads %s as disabled", (value) => {
    expect(envEnabled(value)).toBe(false);
  });

  it("reads an absent or empty value as disabled", () => {
    expect(envEnabled(undefined)).toBe(false);
    expect(envEnabled("")).toBe(false);
  });

  // The parser does not trim: a caller that tolerates padding trims first, as operation-policy.ts
  // does. Pinned so that choice stays with the caller rather than drifting into the shared rule.
  it("does not trim surrounding whitespace", () => {
    expect(envEnabled(" 1")).toBe(false);
    expect(envEnabled("true\n")).toBe(false);
  });
});
