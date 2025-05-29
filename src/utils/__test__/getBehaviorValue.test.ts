import { getBehaviorValue } from '../getBehaviorValue';

describe('getBehaviorValue', () => {
  test('should return "height" for non-iOS platforms', () => {
    const platform = 'android';

    const result = getBehaviorValue(platform);

    expect(result).toBe('height');
  });

  test('should return "padding" for iOS platform', () => {
    const platform = 'ios';

    const result = getBehaviorValue(platform);

    expect(result).toBe('padding');
  });
});
