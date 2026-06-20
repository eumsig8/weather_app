import { describe, expect, test } from 'vitest';
import { getWeatherInfo, getWindDirection } from './weatherCodes';

describe('getWeatherInfo', () => {
  test('returns correct weather label for clear sky', () => {
    const result = getWeatherInfo(0);

    expect(result.label).toBe('Clear sky');
    expect(result.icon).toBe('bi-sun-fill');
  });

  test('returns unknown for unsupported weather code', () => {
    const result = getWeatherInfo(999);

    expect(result.label).toBe('Unknown');
    expect(result.icon).toBe('bi-question-circle');
  });
});

describe('getWindDirection', () => {
  test('returns N for 0 degrees', () => {
    expect(getWindDirection(0)).toBe('N');
  });

  test('returns E for 90 degrees', () => {
    expect(getWindDirection(90)).toBe('E');
  });

  test('returns S for 180 degrees', () => {
    expect(getWindDirection(180)).toBe('S');
  });

  test('returns W for 270 degrees', () => {
    expect(getWindDirection(270)).toBe('W');
  });
});