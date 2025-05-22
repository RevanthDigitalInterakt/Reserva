import type { HomeMediaOutput } from '../../base/graphql/generated';
import { getHomeContent } from '../getHomeContent';

describe('Home content based on selected geolocation', () => {
  const data: HomeMediaOutput[] = [
    {
      id: '1',
      facets: [],
      image: {
        title: '',
        url: '',
      },
      mkt: false,
      orderBy: '',
      reservaMini: false,
      bannerLocation: [],
    },
  ];

  const newData: HomeMediaOutput[] = [
    {
      id: '1',
      facets: [],
      image: {
        title: '',
        url: '',
      },
      mkt: false,
      orderBy: '',
      reservaMini: false,
      bannerLocation: ['PR'],
    },
  ];

  it('should return data without banner location', () => {
    expect(getHomeContent(data, 'SC')).toStrictEqual(data);
  });

  it('should return data with banner location', () => {
    expect(getHomeContent(newData, 'PR')).toStrictEqual(newData);
  });
});
