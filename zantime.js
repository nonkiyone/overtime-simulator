/**
 * 時間文字列 (HH:MM) を分に変換する
 * @param {string} timeString 
 * @returns {number}
 */
export function timeToMinutes(timeString) {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

/**
 * 分を時間文字列 (HH:MM) に変換する
 * @param {number} minutes 
 * @returns {string}
 */
export function minutesToHours(minutes) {
    if (minutes < 0) {
        return `-${minutesToHours(Math.abs(minutes))}`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * 勤務時間を計算する
 * @param {string} start 開始時間
 * @param {string} end 終了時間
 * @param {Array<{start: string, end: string}>} breaks 休憩時間リスト
 * @returns {number} 勤務時間（分）
 */
export function calculateWorkHours(start, end, breaks) {
    const startMins = timeToMinutes(start);
    const endMins = timeToMinutes(end);

    if (endMins <= startMins) return 0;

    let totalMinutes = endMins - startMins;

    breaks.forEach(brk => {
        const breakStartMins = timeToMinutes(brk.start);
        const breakEndMins = timeToMinutes(brk.end);

        if (brk.start && brk.end && breakEndMins > breakStartMins) {
            const effectiveStart = Math.max(startMins, breakStartMins);
            const effectiveEnd = Math.min(endMins, breakEndMins);
            if (effectiveEnd > effectiveStart) {
                totalMinutes -= (effectiveEnd - effectiveStart);
            }
        }
    });
    return totalMinutes;
}

/**
 * 合計休憩時間を計算する
 * @param {Array<{start: string, end: string}>} breaks 
 * @param {string} workStart 
 * @param {string} workEnd 
 * @returns {number}
 */
export function calculateTotalBreakMinutes(breaks, workStart, workEnd) {
    let totalBreakMinutes = 0;
    const workStartMins = timeToMinutes(workStart);
    const workEndMins = timeToMinutes(workEnd);

    breaks.forEach(brk => {
        const breakStartMins = timeToMinutes(brk.start);
        const breakEndMins = timeToMinutes(brk.end);

        if (brk.start && brk.end && breakEndMins > breakStartMins) {
            const effectiveBreakStart = Math.max(workStartMins, breakStartMins);
            const effectiveBreakEnd = Math.min(workEndMins, breakEndMins);

            if (effectiveBreakEnd > effectiveBreakStart) {
                totalBreakMinutes += (effectiveBreakEnd - effectiveBreakStart);
            }
        }
    });
    return totalBreakMinutes;
}
