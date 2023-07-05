export const durationToTimeString = (duration:Duration) => {
  if (!duration) return '00:00:00';

  const {
    days, hours, minutes, seconds,
  } = duration;

  if (!days && !hours && !minutes && !seconds) {
    return '00:00:00';
  }

  const totalHours = `${(days || 0) * 24 + (hours || 0)}`.padStart(2, '0');
  const totalMinutes = `${(minutes || 0)}`.padStart(2, '0');
  const totalSeconds = `${(seconds || 0)}`.padStart(2, '0');

  return `${totalHours}:${totalMinutes}:${totalSeconds}`;
};
