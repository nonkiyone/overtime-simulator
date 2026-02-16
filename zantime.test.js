import { expect, test, describe } from 'vitest';
import { timeToMinutes, minutesToHours, calculateWorkHours, calculateTotalBreakMinutes } from './zantime.js';

describe('Time Conversion', () => {
    test('timeToMinutes handles standard time', () => {
        expect(timeToMinutes('09:00')).toBe(540);
        expect(timeToMinutes('17:45')).toBe(1065);
    });

    test('minutesToHours handles standard minutes', () => {
        expect(minutesToHours(540)).toBe('09:00');
        expect(minutesToHours(1065)).toBe('17:45');
    });

    test('minutesToHours handles negative values', () => {
        expect(minutesToHours(-60)).toBe('-01:00');
    });
});

describe('Work Hours Calculation', () => {
    const defaultBreaks = [
        { start: '12:00', end: '13:00' },
        { start: '17:45', end: '18:15' }
    ];

    test('calculates correct hours with lunch break', () => {
        // 09:00 - 17:45 is 8.75h total. 1h lunch = 7.75h (465 mins)
        const mins = calculateWorkHours('09:00', '17:45', [{ start: '12:00', end: '13:00' }]);
        expect(mins).toBe(465);
        expect(minutesToHours(mins)).toBe('07:45');
    });

    test('calculates overtime correctly', () => {
        // 09:00 - 19:00 with lunch (1h) and break2 (30m)
        // 09:00 - 19:00 is 10h. Breaks: 12:00-13:00 (1h), 17:45-18:15 (0.5h). Total 1.5h breaks.
        // Result: 8.5h (510 mins)
        const mins = calculateWorkHours('09:00', '19:00', defaultBreaks);
        expect(mins).toBe(510);
        expect(minutesToHours(mins)).toBe('08:30');
    });

    test('handles no work (end <= start)', () => {
        expect(calculateWorkHours('09:00', '09:00', [])).toBe(0);
        expect(calculateWorkHours('09:00', '08:00', [])).toBe(0);
    });
});

describe('Break Calculation', () => {
    const breaks = [{ start: '12:00', end: '13:00' }];

    test('calculates break within work hours', () => {
        expect(calculateTotalBreakMinutes(breaks, '09:00', '17:45')).toBe(60);
    });

    test('calculates partial break overlap', () => {
        // Work ends at 12:30, break is 12:00 - 13:00. Effective break is 30m.
        expect(calculateTotalBreakMinutes(breaks, '09:00', '12:30')).toBe(30);
    });

    test('calculates no break if work ends before break', () => {
        expect(calculateTotalBreakMinutes(breaks, '09:00', '11:00')).toBe(0);
    });
});
