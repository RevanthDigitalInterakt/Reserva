import { act, renderHook } from '@testing-library/react-hooks';
import { gatewayProductsListMock, vtexProductsListMock } from '../mocks/productsList';
import useRecommendation from '../useRecommendation';

describe('useRecommendation', () => {
  it('should initialize state with default values', () => {
    const { result } = renderHook(() => useRecommendation());

    expect(result.current.products).toEqual([]);
    expect(result.current.showSection).toBe(true);
  });

  it('should update products when setProducts is called', () => {
    const { result } = renderHook(() => useRecommendation());

    act(() => {
      result.current.setProducts(gatewayProductsListMock);
    });
    expect(result.current.products).toEqual(vtexProductsListMock);
  });

  it('should update showMore when setShowMore is called', () => {
    const { result } = renderHook(() => useRecommendation());

    act(() => {
      result.current.setShowSection(true);
    });

    expect(result.current.showSection).toBeTruthy();
  });
});
