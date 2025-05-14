const TIME_KEY = 'time_spent_minutes';

export function getStoredTime(): number {
  return parseInt(localStorage.getItem(TIME_KEY) || '0', 10);
}

export function incrementStoredTime(): void {
  const current = getStoredTime();
  localStorage.setItem(TIME_KEY, (current + 1).toString());
}