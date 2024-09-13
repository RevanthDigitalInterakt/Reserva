import { OffersCarouselsDocument } from '../../../../../base/graphql/generated';

export const mockOffersCarouselsQuery = {
  request: { query: OffersCarouselsDocument, variables: {} },
  result: {
    data: {
      offersCarousels: [
        {
          type: 'MAIN',
          title: 'Navegue por preço',
          showtime: 10,
          items: [
            {
              mkt: false,
              linkMktIn: 'collection:2958',
              reservaMini: false,
              reference: 'collection:2958',
              orderBy: 'RELEVANCIA',
              facets: [
                {
                  key: 'productClusterIds',
                  value: '2958',
                },
              ],
              image: {
                url: 'https://images.ctfassets.net/6jsfqc13oxv4/1QyP5AenEt89vI0FF5vDGw/1d7a3ad79a8c93d8fd30090cc432ec51/banner-home-app-liqui-50.jpg',
                title: '[banner home 2958] liqui tudo com 50%',
                height: 1400,
                width: 1080,
              },
              filters: {
                priceFilter: {
                  from: null,
                  to: null,
                },
              },
            },
            {
              mkt: false,
              linkMktIn: 'collection:2988',
              reservaMini: false,
              reference: 'collection:2988',
              orderBy: 'RELEVANCIA',
              facets: [
                {
                  key: 'productClusterIds',
                  value: '2988',
                },
              ],
              image: {
                url: 'https://images.ctfassets.net/6jsfqc13oxv4/jIUQic7VCsdg5sCC1DPVj/818dad2fdb430c2a0be7d3af6c67f982/banner-home-app-1p17p.jpg',
                title: '[Home 2988] 1P 17P',
                height: 1400,
                width: 1080,
              },
              filters: {
                priceFilter: {
                  from: null,
                  to: null,
                },
              },
            },
            {
              mkt: false,
              linkMktIn: 'collection:490',
              reservaMini: false,
              reference: 'collection:490',
              orderBy: 'RELEVANCIA',
              facets: [
                {
                  key: 'productClusterIds',
                  value: '490',
                },
              ],
              image: {
                url: 'https://images.ctfassets.net/6jsfqc13oxv4/5JY06t0w8zRnRkgbfWVZss/93a3e6017328cbf800473534b9ebd398/Rectangle_2068.png',
                title: 'teste banner',
                height: 423,
                width: 360,
              },
              filters: {
                priceFilter: {
                  from: null,
                  to: null,
                },
              },
            },
          ],
          categoryCards: {
            sectionCardTitle: 'Navegue por categorias',
            sectionMediaCards: [
              {
                id: '0',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:490',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '490',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/3XYtC2MMnxjYGZCevi3WIy/dd489403865c05fbcf8b9a6f154374db/Screenshot_from_2024-08-15_18-23-14.png',
                  title: 'categoria camiseta',
                },
              },
              {
                id: '1',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:802',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '802',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/7xrnXUOZChlV7WXHcyIOTC/595ecd21e49db1d98aef1fcab56c2766/Screenshot_from_2024-08-15_18-27-01.png',
                  title: 'categoria bermudas',
                },
              },
              {
                id: '2',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:310',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '310',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/2PU3jmKTLkvNnfgFnhFqkM/e0e191ded28482be6a4270e6d2b0fd69/Screenshot_from_2024-08-15_18-27-35.png',
                  title: 'categoria tênis',
                },
              },
              {
                id: '3',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:1587',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '1587',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/Z2kpSFLXijhTdKQvgsG4j/85898ec1d0cde7a9951d418f556b684f/Screenshot_from_2024-08-15_18-27-55.png',
                  title: 'categoria óculos',
                },
              },
              {
                id: '4',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:801',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '801',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/1fkFj5WboCkITSdSeNqUiE/20aced11681c1512795bb59404a701dc/Screenshot_from_2024-08-15_18-29-04.png',
                  title: 'categoria camisetas',
                },
              },
              {
                id: '5',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:1213',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '1213',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/5uIK3YxjuydYo4r6YPyXA1/ed24643656bc1b7b239eb6eddd476457/Screenshot_from_2024-08-15_18-28-49.png',
                  title: 'categoria casacos',
                },
              },
              {
                id: '6',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:1210',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '1210',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/nXPVcDj1RVY5NAbMe4OLQ/c6a182ef52aaa47c6d2d79c6bf70f9fa/Screenshot_from_2024-08-15_18-28-31.png',
                  title: 'categoria calças',
                },
              },
              {
                id: '7',
                deepLink: null,
                deepLinkNewsletter: null,
                reference: 'collection:2148',
                headerImage: null,
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '2148',
                  },
                ],
                image: {
                  url: 'https://images.ctfassets.net/6jsfqc13oxv4/3SCuBDcJKbIABnbDdIBubK/861b6849f7836319d022e5038cf0981b/Screenshot_from_2024-08-15_18-28-16.png',
                  title: 'categoria acessórios',
                },
              },
            ],
          },
        },
      ],
    },
  },
};
