import React, { useEffect, useState } from 'react';
import type { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { StorageService, StorageServiceKeys } from '../../../../shared/services/StorageService';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import {
  CashbackHttpUrl,
  GetDigitalWalletResponse,
  GetExpireBalanceResponse,
  GetUserOperationsResponse,
  MyCashbackAPI,
  UserOperations,
} from '../../api/MyCashbackAPI';
import { MyWalletView } from './MyWallet.view';

interface MyWalletContainerProps {
  navigateBack: () => void;
}

export enum FilterOptions {
  ALL = 'ALL',
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  PENDING = 'PENDING',
}

export enum BalanceType {
  EXPIRE = 'expire',
  ACTIVE = 'active',
  FUTURE = 'future',
}

export const MyWalletContainer = ({ navigateBack }: MyWalletContainerProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [operationFilter, setOperationFilter] = useState<FilterOptions>(FilterOptions.ALL);
  const [userOperations, setUserOperations] = useState<GetUserOperationsResponse | null>(null);
  const [userExpireBalance, setUserExpireBalance] = useState<GetExpireBalanceResponse | null>(null);
  const [totalPending, setTotalPending] = useState<number | undefined>(0);
  const [userOperationsFiltered, setUserOperationsFiltered] = useState<any>(null);
  const [selectedBalance, setSelectedBalance] = useState<BalanceType>(BalanceType.ACTIVE);
  const [profile, setProfile] = useState<ProfileVars>();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const handleToggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      wbrand: defaultBrand.picapau,
    });

    StorageService.getItem<ProfileVars>({
      key: StorageServiceKeys.PROFILE,
      isJSON: true,
    }).then((value) => {
      setProfile(value);
    });
  }, []);

  // covert cents to real
  const convertCentsToReal = (cents: number) => {
    const result = cents / 100;
    return result;
  };

  const changeOperationFilter = (filter: FilterOptions) => {
    setOperationFilter(filter);
  };

  const getUserOperations = async (cpf: string) => {
    const response = await MyCashbackAPI.get<GetUserOperationsResponse>(
      `${CashbackHttpUrl.GetUserOperations}${cpf}/operations`,
    );
    setUserOperations(response.data);
  };

  const getUserExpireBalance = async (cpf: string) => {
    const response = await MyCashbackAPI.get<GetExpireBalanceResponse>(
      `${CashbackHttpUrl.GetExpireBalance}${cpf}`,
    );
    setUserExpireBalance(response.data);
  };

  const changeSelectedBalance = (balance: BalanceType) => {
    if (balance === BalanceType.FUTURE) {
      setOperationFilter(FilterOptions.PENDING);
    }
    setSelectedBalance(balance);
  };

  const getCreditBalance = async (cpf: string) => {
    const { data } = await MyCashbackAPI.get<GetDigitalWalletResponse>(
      `${CashbackHttpUrl.GetDigitalWallet}${cpf}`,
    );

    const balanceFormated = data.data.balance_in_cents > 0
      ? convertCentsToReal(data.data.balance_in_cents)
      : data.data.balance_in_cents;

    setBalance(balanceFormated);
  };

  const operationsFiltered = (filter: FilterOptions): UserOperations[] | undefined => {
    switch (filter) {
      case FilterOptions.ALL:
        return userOperations?.data?.filter(
          (operation) => operation.applied_balance_in_cents > 0
          || operation.cashback_amount_in_cents > 0
          && operation.status !== 'pending',
        );
      case FilterOptions.DEBIT:
        return userOperations?.data?.filter(
          (operation) => operation.applied_balance_in_cents > 0
          && operation.status !== 'pending',
        );
      case FilterOptions.PENDING:
        const filtered = userOperations?.data?.filter(
          (operation) => operation.status === 'pending',
        );
        const initialValue = 0;
        const sumWithInitial = filtered?.reduce(
          (previousValue, currentValue) => previousValue + currentValue.cashback_amount_in_cents,
          initialValue,
        );
        setTotalPending(sumWithInitial);
        return filtered;
      case FilterOptions.CREDIT:
        return userOperations?.data?.filter(
          (operation) => operation.cashback_amount_in_cents > 0
          && operation.status !== 'pending',
        );
      default:
        return userOperations?.data?.filter(
          (operation) => operation.status !== 'pending',
        );
    }
  };

  useEffect(() => {
    if (profile?.document) {
      getCreditBalance(profile.document);
      getUserOperations(profile.document);
      getUserExpireBalance(profile.document);
      const filtered = operationsFiltered(operationFilter);
      setUserOperationsFiltered(filtered);
    }
  }, [profile]);

  useEffect(() => {
    const filtered = operationsFiltered(operationFilter);
    setUserOperationsFiltered(filtered);
  }, [userOperations, operationFilter]);

  const formatDate = (date: string) => {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate();
    const month = (dateFormated.getMonth() + 1).toString().padStart(2, '0');
    const year = dateFormated.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
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
        totalPending={totalPending}
        userExpireBalance={userExpireBalance}
        operationFilter={operationFilter}
        selectedBalance={selectedBalance}
        changeSelectedBalance={changeSelectedBalance}
        handleToggleBalanceVisibility={handleToggleBalanceVisibility}
        changeOperationFilter={changeOperationFilter}
      />
    </>
  );
};
