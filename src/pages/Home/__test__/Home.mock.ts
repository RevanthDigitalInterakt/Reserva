import {
  HomeCarouselsDocument,
  HomeConfigDocument,
  HomeCountdownDocument,
  HomeMediasDocument,
} from '../../../base/graphql/generated';

export const mockHomeCountdownQuery = {
  request: { query: HomeCountdownDocument, variables: {} },
  result: {
    data: { homeCountdown: null },
  },
};

export const mockHomeCarouselQuery = {
  request: { query: HomeCarouselsDocument, variables: {} },
  result: {
    data: {
      homeCarousels: [
        {
          id: 'MAIN',
          type: 'MAIN',
          showtime: 10,
          items: [{
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2894',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2894', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/RYtXBnHIjoNdgmEvoO9Km/d06af9b5124eca415b7dfbf56fad7163/banner-home-app-liqui_para_todos.gif', title: 'Liqui para Todos Agosto 2023', height: 1400, width: 1080, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2648',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2648', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/4TFpt2F0YWUdrb2lZ2SYak/09ad88e0d507be9079da04be0733bd05/banner-home-app-od_ate129.jpg', title: 'Camisetas até R$129', height: 1400, width: 1080, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2772',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2772', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/2PZVKTj8T4Vkf0rGIw3NsK/2a8f32e7fe4e14ceaec20157001d328f/banner-home-app-ofertas_ate60.gif', title: 'Home 2772 Ofertas Reserva', height: 1400, width: 1080, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }],
          __typename: 'HomeCarouselOutput',
        },
        {
          id: 'BRANDS',
          type: 'BRANDS',
          showtime: null,
          items: [{
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2875',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2875', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/2KV8eKVsr4frv5Wcd0oYPr/bbb405ea436cf621a9ed5993a3a9d726/AF_RESERVA_LOGO_PREFERENCIAL_VERSAO_COR_POSITIVA.png', title: '', height: null, width: null, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:930',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '930', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/1QoMJOvYTiEXSPp5zSDtUi/cff6ae1381f71a26cce9bfe428dd9638/rsvGO-logos-02.png', title: '', height: null, width: null, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2605',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2605', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/6sXahjVEmwE9iUsW8xGS0w/e90491227f8afab77a3d88da8f5e5ac9/AF_RESERVA_MINI_LOGO_SIMPLIFICADO_VERSAO_COR_VERMELHO_POSITIVA_RGB.png', title: '', height: null, width: null, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:1228',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '1228', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/zt55b6oFguzEyCVuxRTp1/1bc54d91b42556a00babbc0a7ce28040/Reversa.png', title: '', height: null, width: null, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:1587',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '1587', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/1YN28l3BTXvea0PzgDkiP/55d8e1fa4538beabb474aee2f786c4db/oculos_reserva.png', title: '', height: null, width: null, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }],
          __typename: 'HomeCarouselOutput',
        },
        {
          id: 'CARDS',
          type: 'CARDS',
          showtime: 10,
          items: [{
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2231',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2231', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/4ezAqZI6EBjBKlHbjC1nRR/e5a1c423c52ad2bd705f06b5336be55f/banner-card_app-camisas.jpg', title: '[Card] Liqui Reserva Camisas 2023', height: 898, width: 1114, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2234',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2234', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/2cg232VjWWBOuB0mKL8lB6/999a65cb9f5c55090e44a9c35c20d0b6/banner-card_app-calcas.jpg', title: '[Card] Liqui Reserva Calças 2023', height: 898, width: 1114, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }, {
            mkt: false,
            linkMktIn: null,
            reservaMini: false,
            reference: 'collection:2232',
            orderBy: 'RELEVANCIA',
            facets: [{ key: 'productClusterIds', value: '2232', __typename: 'ProductFacetOutput' }],
            image: {
              url: 'https://images.ctfassets.net/6jsfqc13oxv4/28yQznd8Yw0jugpXqSteow/65a161d411d1920a303a5d5c7a65e424/banner-card_app-polos.jpg', title: '[Card] Liqui Reserva Polos 2023', height: 898, width: 1114, __typename: 'HomeCarouselItemImageOutput',
            },
            __typename: 'HomeCarouselItemOutput',
          }],
          __typename: 'HomeCarouselOutput',
        },
      ],
    },
  },
};

export const mockHomeMediasQuery = {
  request: { query: HomeMediasDocument, variables: {} },
  result: {
    data: {
      homeMedias: [
        {
          id: '0-collection:2605', mkt: false, linkMktIn: null, reservaMini: false, orderBy: 'RELEVANCIA', reference: 'collection:2605', facets: [{ key: 'productClusterIds', value: '2605', __typename: 'ProductFacetOutput' }], image: { url: 'https://images.ctfassets.net/6jsfqc13oxv4/1ASOXYFWnvqpAvyYBrLwbA/e6f5665d120d9a17456e2eb944331670/banner-card_app-infantil.jpg', title: '[Card] Liqui Infantil 2023', __typename: 'HomeCarouselItemImageOutput' }, __typename: 'HomeMediaOutput',
        },
        {
          id: '1-collection:420', mkt: false, linkMktIn: null, reservaMini: false, orderBy: 'RELEVANCIA', reference: 'collection:420', facets: [{ key: 'productClusterIds', value: '420', __typename: 'ProductFacetOutput' }], image: { url: 'https://images.ctfassets.net/6jsfqc13oxv4/1fQG47BLMJcndcC8uoT3nW/6ddb6eb36952e9844e11116bc20d183a/banner-card_app-calcados.jpg', title: '[Card 420] Calçados Pais', __typename: 'HomeCarouselItemImageOutput' }, __typename: 'HomeMediaOutput',
        },
        {
          id: '2-collection:2642', mkt: false, linkMktIn: null, reservaMini: false, orderBy: 'RELEVANCIA', reference: 'collection:2642', facets: [{ key: 'productClusterIds', value: '2642', __typename: 'ProductFacetOutput' }], image: { url: 'https://images.ctfassets.net/6jsfqc13oxv4/3g0t6wvxCZXEs7XOvMyYJW/b9620ba0d2e4ff91cb61865e53bd5bc4/banner-card_app-liqui_reversa.jpg', title: 'Card 2642 Liqui Reversa', __typename: 'HomeCarouselItemImageOutput' }, __typename: 'HomeMediaOutput',
        },
        {
          id: '3-collection:466', mkt: false, linkMktIn: null, reservaMini: false, orderBy: 'RELEVANCIA', reference: 'collection:466', facets: [{ key: 'productClusterIds', value: '466', __typename: 'ProductFacetOutput' }], image: { url: 'https://images.ctfassets.net/6jsfqc13oxv4/67Bb3sdHIfZUsK5MGXpemd/3a83aee403d169e8ed9e21f346591b6e/banner-card_app-acessorios.jpg', title: '[Categoria 466] Acessórios Go', __typename: 'HomeCarouselItemImageOutput' }, __typename: 'HomeMediaOutput',
        },
        {
          id: '4-collection:1587', mkt: false, linkMktIn: null, reservaMini: false, orderBy: 'RELEVANCIA', reference: 'collection:1587', facets: [{ key: 'productClusterIds', value: '1587', __typename: 'ProductFacetOutput' }], image: { url: 'https://images.ctfassets.net/6jsfqc13oxv4/4dQzovAJFJv5UcEJKE2EY3/318aabb479071d63d9c33de877e59ae2/banner-card_app-oculos.jpg', title: 'Óculos 2023', __typename: 'HomeCarouselItemImageOutput' }, __typename: 'HomeMediaOutput',
        },
      ],
    },
  },
};

export const mockHomeConfigQuery = {
  request: { query: HomeConfigDocument, variables: {} },
  result: {
    data: {
      homeConfig: {
        id: 'MainConfig',
        offersPage: 'collection:2772',
        __typename: 'ConfigOutput',
      },
    },
  },
};
