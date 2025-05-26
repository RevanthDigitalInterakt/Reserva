import { getBrands } from '../getBrands';

interface Item {
  additionalInfo: {
    brandName: string;
  }
}

describe('getBrands', () => {
  const item: Item[] = [
    {
      additionalInfo: {
        brandName: 'RESERVA',
      },
    },
    {
      additionalInfo: {
        brandName: 'RESERVA GO',
      },
    },
    {
      additionalInfo: {
        brandName: 'RESERVA MINI',
      },
    },
    {
      additionalInfo: {
        brandName: 'REVERSA',
      },
    },
    {
      additionalInfo: {
        brandName: 'REVERSA GO',
      },
    },
  ];

  it('should return join brands', () => {
    expect(getBrands(item)).toBe('RESERVA,RESERVA GO,RESERVA MINI,REVERSA,REVERSA GO');
  });
});
