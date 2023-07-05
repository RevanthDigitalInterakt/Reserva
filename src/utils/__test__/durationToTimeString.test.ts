import { durationToTimeString } from '../durationToTimeString';

describe('durationToTimeString', () => {
  it('should return "00:00:00" for an empty duration', () => {
    const duration = {};
    const result = durationToTimeString(duration);
    expect(result).toEqual('00:00:00');
  });

  it('should return "00:00:00" for a duration with all values as 0', () => {
    const duration = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    const result = durationToTimeString(duration);
    expect(result).toEqual('00:00:00');
  });

  it('should return the correct time string for a non-empty duration', () => {
    const duration = {
      days: 1,
      hours: 2,
      minutes: 30,
      seconds: 45,
    };
    const result = durationToTimeString(duration);
    expect(result).toEqual('26:30:45');
  });

  it('should return the correct time string when some values are missing', () => {
    const duration = {
      hours: 10,
      seconds: 5,
    };
    const result = durationToTimeString(duration);
    expect(result).toEqual('10:00:05');
  });
});
