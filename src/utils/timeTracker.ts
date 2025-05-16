const TIME_KEY = "time_spent_minutes";

/**
 * Returns the number of minutes stored in localStorage.
 */
export function getStoredTime(): number {
  return parseInt(localStorage.getItem(TIME_KEY) || "0", 10);
}

/**
 * Increments the stored time in localStorage by one minute.
 */
export function incrementStoredTime(): void {
  const current = getStoredTime();
  localStorage.setItem(TIME_KEY, (current + 1).toString());
}
