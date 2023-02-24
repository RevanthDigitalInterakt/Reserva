import { useEffect } from 'react';
import Config from 'react-native-config';
import useMarketPlaceInStore from '../zustand/useMarketPlaceInStore';

const useInitialMarketPlaceIn = () => {
  const setMktinActive = useMarketPlaceInStore((state) => state.setMktinActive);
  const setSellersMktIn = useMarketPlaceInStore((state) => state.setSellersMktIn);

  useEffect(() => {
    async function checkMktinActive() {
      try {
        const cache = new Date().getTime();
        const response = await fetch(
          `${Config.URL_BASE_MARKETPLACE_IN}dataentities/FF/search?_where=(name=mktin)&_fields=name,isAppActive&${cache}=cache`,
        );
        const featureFlagMktin = (await response.json())?.[0]?.isAppActive;
        if (featureFlagMktin) {
          setMktinActive(true);
        } else {
          setMktinActive(false);
        }
      } catch {
        setMktinActive(false);
      }
    }
    checkMktinActive();
  }, []);

  useEffect(() => {
    async function getSellersMktIn() {
      try {
        let sellers = [];
        new Array(3).fill(0).forEach(async () => {
          if (sellers.length === 0) {
            const response = await fetch(
              `${Config.URL_BASE_MARKETPLACE_IN}dataentities/MS/search?_fields=sellerId`,
            );
            const data: Array<{ sellerId: string }> = await response.json();
            if (data.length > 0) {
              setSellersMktIn(data.map((s) => s.sellerId));
              sellers = data;
            } else {
              setSellersMktIn([]);
            }
          }
        });
      } catch {
        setSellersMktIn([]);
      }
    }
    getSellersMktIn();
  }, []);
};

export default useInitialMarketPlaceIn;
