const TIME_KEY = "time_spent_minutes";

/**
 * Retrieves the number of minutes the user has spent, as stored in localStorage.
 *
 * @returns {number} The number of minutes stored, or 0 if not set.
 */
export function getStoredTime(): number {
  return parseInt(localStorage.getItem(TIME_KEY) ?? "0", 10);
}

/**
 * Increments the stored time in localStorage by one minute.
 *
 * This function reads the current value, adds one, and updates localStorage.
 */
export function incrementStoredTime(): void {
  const current = getStoredTime();
  localStorage.setItem(TIME_KEY, (current + 1).toString());
}
