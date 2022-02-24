import React, { Fragment, useEffect, useState } from "react";
import { TopBarBackButton } from "../../../../modules/Menu/components/TopBarBackButton";
import { CashbackHttpUrl, GetDigitalWalletResponse, GetUserOperationsResponse, MyCashbackAPI, UserOperations } from "../../api/MyCashbackAPI";
import { MyWalletView } from "./MyWallet.view";

interface MyWalletContainerProps {
  navigateBack: () => void;
  navigateToError: () => void;
}

export enum FilterOptions {
  ALL = "ALL",
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export const MyWalletContainer = (
  {
    navigateBack,
  }: MyWalletContainerProps
) => {
  const [balance, setBalance] = useState<number>(0);
  const [operationFilter, setOperationFilter] = useState<FilterOptions>(FilterOptions.CREDIT);
  const [userOperations, setUserOperations] = useState<GetUserOperationsResponse | null>(null);
  const [userOperationsFiltered, setUserOperationsFiltered] = useState<any>(null);
  const [balanceVisible, setBalanceVisible] = useState(false);

  const handleToggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  // covert cents to real
  const convertCentsToReal = (cents: number) => {
    const result = cents / 100;
    return result.toFixed(2).replace(".", ",");
  };

  const getUserOperations = async (cpf: string) => {
    const response = await MyCashbackAPI.get<GetUserOperationsResponse>(
      `${CashbackHttpUrl.GetUserOperations}${cpf}/operations`
    );
    setUserOperations(response.data);
  };

  const getCreditBalance = async ( cpf: string) => {
    const { data } = await MyCashbackAPI.get<GetDigitalWalletResponse>(
      `${CashbackHttpUrl.GetDigitalWallet}${cpf}`,
    );

    setBalance(
      convertCentsToReal(data.data.balance_in_cents)
    );
  };

  const operationsFiltered = (filter: FilterOptions): UserOperations[] | undefined => {
    switch (filter) {
      case FilterOptions.ALL:
        return userOperations?.data?.filter( operation => operation.status !== 'pending')
      case FilterOptions.DEBIT:
        return userOperations?.data?.filter( operation => operation.applied_balance_in_cents > 0 && operation.status !== 'pending')
      case FilterOptions.CREDIT:
        return userOperations?.data?.filter( operation => operation.cashback_amount_in_cents > 0 && operation.status !== 'pending')
      default:
        return userOperations?.data?.filter( operation => operation.status !== 'pending')
    }
  }

  useEffect(() => {
    getCreditBalance("10628485786");
    getUserOperations("10628485786");
  }, []);

  useEffect(() => {
    const filtered = operationsFiltered(operationFilter);
    setUserOperationsFiltered(filtered);
  }, [operationFilter]);

  const formatDate = (date: string) => {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate();
    const month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    const hours = dateFormated.getHours();
    const minutes = dateFormated.getMinutes();

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  return(
    <Fragment>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      <MyWalletView
        balanceVisible={balanceVisible}
        balance={balance}
        userOperations={userOperations}
        userOperationsFiltered={userOperationsFiltered}
        convertCentsToReal={convertCentsToReal}
        formatDate={formatDate}
        operationFilter={operationFilter}
        handleToggleBalanceVisibility={handleToggleBalanceVisibility}
      />
    </Fragment>
  );
};
