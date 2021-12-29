import React, { Fragment, useState } from "react";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
  AcceptLoyaltyResponse,
  CashbackHttpUrl,
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
  const [
    isVisibleTermsAndConditions,
    setIsVisibleTermsAndConditions
  ] = useState<boolean>(false);
  const [loadingLoyalRequest, setLoadingLoyalRequest] = useState<boolean>(false);

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
