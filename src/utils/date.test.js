import { describe, expect, it } from 'vitest';
import { getOldestWeekDate } from './date';

describe('testing getOldestWeekDate', () => {
  it('returns the correct date', () => {
    const result = getOldestWeekDate();
    expect(result.getFullYear()).toBe(new Date().getFullYear() - 1);
    expect(result.getMonth()).toBe(new Date().getMonth());
  });
});
