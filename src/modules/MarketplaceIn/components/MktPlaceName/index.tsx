import React, { useCallback, useEffect, useState } from 'react';
import {
  Image, Text, TouchableOpacity,
} from 'react-native';
import { Box } from '@usereservaapp/reserva-ui';
import useMarketPlaceInd from '../../../../zustand/useMarketPlaceInStore';
import BannerMktplace from '../BannerMtkPlace';
import { Styles } from './styles/styles';
import { SellerInfoOutput, useSellerInfoLazyQuery } from '../../../../base/graphql/generated';
import EventProvider from '../../../../utils/EventProvider';

interface IMktplaceName {
  sellerId: string,
  showIconModalInfo?: boolean
}

export interface IMktplacein {
  sellerId: string;
  texto: string
  logo: string
  linkApp: string
  bannerMobile: string
  sellerName: string
}

export const MktplaceName = ({ sellerId, showIconModalInfo }: IMktplaceName) => {
  const [marketPlaceData, setMarketPlaceData] = useState<SellerInfoOutput | undefined>(undefined);
  const [modalBanner, setModalBanner] = useState<boolean>(false);
  const { sellersMktIn } = useMarketPlaceInd();
  const [sellersInfo] = useSellerInfoLazyQuery({
    context: { clientName: 'gateway' },
  });

  const handleToogleModalBanner = useCallback((): void => {
    setModalBanner((oldValue: boolean): boolean => !oldValue);
  }, []);

  const isMarketPlaceIn = useCallback(
    (): boolean => sellersMktIn.includes(sellerId), [sellerId],
  );

  const initializeMarketPlaceData = useCallback(async () => {
    try {
      const { data } = await sellersInfo({
        variables: {
          sellerId,
        },
      });
      if (data?.sellerInfo) {
        setMarketPlaceData(data.sellerInfo);
      }
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [sellerId]);

  useEffect(() => {
    (async () => {
      if (showIconModalInfo) {
        await initializeMarketPlaceData();
      }
    })();
  }, [sellerId, showIconModalInfo]);

  return (
    <>
      {isMarketPlaceIn() && (
        <Box mt="xxs" mb="xxs">
          <Text style={Styles.mainText}>
            Indicado por
            {' '}
            <Text style={Styles.reservaText}>Reserva</Text>
            {' '}
            |
            Entregue por
            {' '}
            <Text style={Styles.sellerText}>
              {' '}
              {marketPlaceData ? marketPlaceData.sellerName : sellerId}
            </Text>
            {showIconModalInfo && marketPlaceData ? (
              <TouchableOpacity
                onPress={handleToogleModalBanner}
                style={Styles.modalButton}
              >
                <Image source={{ uri: 'https://lojausereserva.vteximg.com.br/arquivos/icon-info.png' }} style={Styles.imageIcon} />
              </TouchableOpacity>
            ) : null}
          </Text>
          {showIconModalInfo && marketPlaceData ? (
            <BannerMktplace
              open={modalBanner}
              setOpenModal={setModalBanner}
              texto={marketPlaceData.texto || ''}
              logo={marketPlaceData.logo || ''}
              bannerMobile={marketPlaceData.bannerMobile || ''}
              linkApp={marketPlaceData.linkApp || ''}
            />
          ) : null}
        </Box>
      )}
    </>
  );
};
