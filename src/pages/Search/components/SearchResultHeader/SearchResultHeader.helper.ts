import { SearchOrderByEnum } from '../../../../base/graphql/generated';

export const orderByTypes = [
  {
    text: 'Relevância',
    value: SearchOrderByEnum.OrderByScoreDesc,
  },
  {
    text: 'Mais Vendidos',
    value: SearchOrderByEnum.OrderByTopSaleDesc,
  },
  {
    text: 'Mais Recentes',
    value: SearchOrderByEnum.OrderByReleaseDateDesc,
  },
  {
    text: 'Descontos',
    value: SearchOrderByEnum.OrderByBestDiscountDesc,
  },
  {
    text: 'Maior Preço',
    value: SearchOrderByEnum.OrderByPriceDesc,
  },
  {
    text: 'Menor Preço',
    value: SearchOrderByEnum.OrderByPriceAsc,
  },
  {
    text: 'De A a Z',
    value: SearchOrderByEnum.OrderByNameAsc,
  },
  {
    text: 'De Z a A',
    value: SearchOrderByEnum.OrderByNameDesc,
  },
];
