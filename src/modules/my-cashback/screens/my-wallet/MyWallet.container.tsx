import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import { MyWalletView } from './MyWallet.view';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import {
  useCashbackLazyQuery,
  CashbackQuery,
} from '../../../../base/graphql/generated';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

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
  const [
    userOperations,
    setUserOperations,
  ] = useState<CashbackQuery['cashback']['operations'] | null>(null);
  const [
    userExpireBalance,
    setUserExpireBalance,
  ] = useState<CashbackQuery['cashback']['expiration'] | null>(null);
  const [totalPending, setTotalPending] = useState<number | undefined>(0);
  const [userOperationsFiltered, setUserOperationsFiltered] = useState<any>(null);
  const [selectedBalance, setSelectedBalance] = useState<BalanceType>(BalanceType.ACTIVE);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { profile } = useAuthStore(['profile']);

  const [getCashback, { loading }] = useCashbackLazyQuery({
    context: { clientName: 'gateway' }, fetchPolicy: 'cache-and-network',
  });

  const handleToggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      wbrand: defaultBrand.picapau,
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

  const changeSelectedBalance = (balance: BalanceType) => {
    if (balance === BalanceType.FUTURE) {
      setOperationFilter(FilterOptions.PENDING);
    }
    setSelectedBalance(balance);
  };

  const getCashbackData = useCallback(async () => {
    try {
      const { data } = await getCashback();

      if (!data?.cashback) return;

      const { wallet, operations, expiration } = data?.cashback;
      setBalance(wallet?.balanceInCents);
      setUserOperations(operations);
      setUserExpireBalance(expiration);
    } catch (error) {
      ExceptionProvider.captureException(error, { currentProfileDocument: profile?.document });

      Alert.alert(
        'Ops!',
        'Ocorreu um erro ao carregar o saldo de cashback.',
        [{ text: 'Voltar', onPress: navigateBack }],
      );
    }
  }, [getCashback, profile]);

  const operationsFiltered = (filter: FilterOptions): CashbackQuery['cashback']['operations'] | undefined => {
    switch (filter) {
      case FilterOptions.ALL:
        return userOperations?.filter(
          (operation) => operation.appliedBalanceInCents > 0
          || operation.cashbackAmountInCents > 0
          && operation.status !== 'pending',
        );
      case FilterOptions.DEBIT:
        return userOperations?.filter(
          (operation) => operation.appliedBalanceInCents > 0
          && operation.status !== 'pending',
        );
      case FilterOptions.PENDING:
        const filtered = userOperations?.filter(
          (operation) => operation.status === 'pending',
        );
        const initialValue = 0;
        const sumWithInitial = filtered?.reduce(
          (previousValue, currentValue) => previousValue + currentValue.cashbackAmountInCents,
          initialValue,
        );
        setTotalPending(sumWithInitial);
        return filtered;
      case FilterOptions.CREDIT:
        return userOperations?.filter(
          (operation) => operation?.cashbackAmountInCents > 0
          && operation?.status !== 'pending',
        );
      default:
        return userOperations?.filter(
          (operation) => operation?.status !== 'pending',
        );
    }
  };

  useEffect(() => {
    if (profile?.document) {
      getCashbackData();
      const filtered = operationsFiltered(operationFilter);
      setUserOperationsFiltered(filtered);
    }
  }, [profile?.document]);

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
        loading={loading}
        showShadow
        backButtonPress={navigateBack}
      />
      <MyWalletView
        balanceVisible={balanceVisible}
        balance={balance}
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
