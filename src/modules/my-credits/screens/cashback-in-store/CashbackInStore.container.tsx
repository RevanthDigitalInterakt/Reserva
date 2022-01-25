import React, { Fragment, useEffect, useRef, useState } from "react";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
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
  const [token, setToken] = useState<string>();

  const intervalTokenRef: { current: NodeJS.Timeout | null } = useRef(null);

  const generateToken = async () => {
    const date = new Date();
    // add 1 day to current date
    date.setDate(date.getDate() + 1);
    const tomorrow = date.toISOString();

    if (costumerDocument) {
      const { data } = await MyCreditsAPI.post<GetTokenResponse>(
        `${CashbackHttpUrl.GetToken}${costumerDocument}/authenticate`,
        {
          type: "qrcode",
          expire_date: tomorrow,
        }
      );
      setToken(data.data.token);
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

  return(
    <Fragment>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      <CashbackInStoreView
        token={token}
      />
    </Fragment>
  );
};
