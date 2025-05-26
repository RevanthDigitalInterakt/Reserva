import { renderHook } from '@testing-library/react-hooks';
import useRecommendationShelf from '../useRecommendationShelf';

describe('useRecommendationShelf', () => {
  it('should initialize state with default values', () => {
    const { result } = renderHook(() => useRecommendationShelf());

    expect(result.current.onSearchShelf).toBeInstanceOf(Function);
  });
});
