import React, { Fragment, useEffect, useRef, useState } from "react";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
  AcceptLoyaltyResponse,
  CashbackHttpUrl,
  GetTokenResponse,
  MyCreditsAPI
} from "../../../my-credits/api/MyCreditsAPI";
import { CashbackInStoreView } from "./CashbackInStore.view";

interface CashbackInStoreContainerProps {
  isLoyal: boolean;
  costumerDocument: string;
  navigateBack: () => void;
  navigateToError: () => void;
}

export const CashbackInStoreContainer = (
  {
    isLoyal,
    costumerDocument,
    navigateBack,
    navigateToError
  }: CashbackInStoreContainerProps
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [
    isVisibleTermsAndConditions,
    setIsVisibleTermsAndConditions
  ] = useState<boolean>(false);
  const [loadingLoyalRequest, setLoadingLoyalRequest] = useState<boolean>(false);
  const [loadingQRCode, setLoadingQRCode] = useState<boolean>(false);

  const intervalTokenRef: { current: NodeJS.Timeout | null } = useRef(null);

  const handleAcceptLoyalty = async () => {
    if (!isLoyal && costumerDocument) {
      setLoadingLoyalRequest(true);
      await MyCreditsAPI.post<AcceptLoyaltyResponse>(
        CashbackHttpUrl.AcceptLoyalty,
        {
          cpf: costumerDocument
        }
      );
      setLoadingLoyalRequest(false);
    }
  };

  const generateToken = async () => {
    if (isLoyal && costumerDocument) {
      setLoadingLoyalRequest(true);
      const { data } = await MyCreditsAPI.get<GetTokenResponse>(
        CashbackHttpUrl.ModifyToken,
        {
          cpf: costumerDocument
        }
      );
      setToken(data.token);
      setLoadingLoyalRequest(false);
    }
  };


  useEffect(() => {
    generateToken();
    const intervalToken = setInterval(() => {
      generateToken();
    }, 60 * 1000);
    intervalTokenRef.current = intervalToken;

    return () => {
      clearInterval(intervalTokenRef.current as NodeJS.Timeout);
    };
  }, []);

  const handleToggleTermsAndConditions = async () => {
    setIsVisibleTermsAndConditions(
      !isVisibleTermsAndConditions
    );
  };

  return(
    <Fragment>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      <CashbackInStoreView
        isLoyal={isLoyal}
        acceptLoyalty={handleAcceptLoyalty}
        loadingLoyalRequest={loadingLoyalRequest}
        handleToggleTermsAndConditions={handleToggleTermsAndConditions}
        isVisibleTermsAndConditions={isVisibleTermsAndConditions}
      />
    </Fragment>
  );
};
