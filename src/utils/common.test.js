import { describe, expect, it } from 'vitest';
import { convertStringToBoolean, countUnreadNotifications, formatCongregationInfo } from './common';

describe('testing convertStringToBoolean', () => {
  it('returns true with true string', () => {
    const result = convertStringToBoolean('true');
    expect(result).toBe(true);
  });

  it('returns false with false string', () => {
    const result = convertStringToBoolean('false');
    expect(result).toBe(false);
  });

  it('returns false if string undefined', () => {
    const result = convertStringToBoolean();
    expect(result).toBe(false);
  });

  it('returns false if string empty', () => {
    const result = convertStringToBoolean('');
    expect(result).toBe(false);
  });
});

describe('testing countUnreadNotifications', () => {
  it('return 0 for empty list', () => {
    const announcements = [];
    const count = countUnreadNotifications({ announcements });
    expect(count).toBe(0);
  });

  it('return 1 if title not read', () => {
    const announcements = [{ title: [{ language: 'E', isRead: false }], body: [{ language: 'E', isRead: true }] }];
    const count = countUnreadNotifications({ announcements });
    expect(count).toBe(1);
  });

  it('return 1 if body not read', () => {
    const announcements = [{ title: [{ language: 'E', isRead: true }], body: [{ language: 'E', isRead: false }] }];
    const count = countUnreadNotifications({ announcements });
    expect(count).toBe(1);
  });

  it('return 2 for 2 announcements', () => {
    const announcements = [
      { title: [{ language: 'E', isRead: false }], body: [{ language: 'E', isRead: false }] },
      { title: [{ language: 'E', isRead: false }], body: [{ language: 'E', isRead: false }] },
    ];
    const count = countUnreadNotifications({ announcements });
    expect(count).toBe(2);
  });
});

describe('testing formatCongregationInfo', () => {
  it('return empty string if params undefined', () => {
    const result = formatCongregationInfo();
    expect(result).toBe('');
  });

  it('return empty string if empty params', () => {
    const result = formatCongregationInfo('', '');
    expect(result).toBe('');
  });
  it('return correct value if params provided', () => {
    const result = formatCongregationInfo('Test Congregation', 12345);
    expect(result).toBe('Test Congregation (12345)');
  });
});
