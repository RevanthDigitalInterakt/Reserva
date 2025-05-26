import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { PriceCustom } from '../../../Checkout/components/PriceCustom';
import { BalanceType, FilterOptions } from './MyWallet.container';
import type { CashbackQuery } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Button } from '../../../../components/Button';
import { convertCashbackStatus } from '../../../../utils/convertCashbackStatus';

export interface MyWalletViewProps {
  balanceVisible: boolean;
  balance: number;
  userOperationsFiltered: any;
  totalPending: number | undefined;
  operationFilter: FilterOptions;
  selectedBalance: BalanceType;
  userExpireBalance: CashbackQuery['cashback']['expiration'] | null;
  changeSelectedBalance: (balanceType: BalanceType) => void;
  formatDate: (date: string) => string;
  handleToggleBalanceVisibility: () => void;
  changeOperationFilter: (filter: FilterOptions) => void;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    backgroundColor: '#EFEFEF',
    padding: 8,
    textAlign: 'left',
    marginRight: 5,
    paddingBottom: 20,
    zIndex: -1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});

const defaultFontSize = 13.3;

export function MyWalletView({
  balanceVisible,
  balance,
  formatDate,
  operationFilter,
  userOperationsFiltered,
  userExpireBalance,
  totalPending,
  handleToggleBalanceVisibility,
  changeOperationFilter,
  selectedBalance,
  changeSelectedBalance,
}: MyWalletViewProps) {
  return (
    <>
      <LinearGradient
        colors={['#414040', '#000000']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0.0 }}
        style={{
          height: 220, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, padding: 16,
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography fontFamily="reservaSerifBold" fontSize={32} color="white">
              Cashback
            </Typography>
            <Typography fontFamily="reservaSansRegular" fontSize={16} color="white">
              Boas-vindas à sua carteira
            </Typography>
          </Box>
        </Box>
        <Box mt="xxs">
          <Typography fontFamily="reservaSansLight" fontSize={2} color="white">
            SALDO DISPONÍVEL
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {balanceVisible ? (
              <Typography fontFamily="reservaSansLight" fontSize={2} color="white">
                <PriceCustom
                  fontFamily="reservaSansBold"
                  sizeInterger={42}
                  sizeDecimal={24}
                  num={balance || 0}
                  color="white"
                />
              </Typography>
            ) : (
              <Box>
                <Box mt="xxxs" bg="#575757" height={12} width={200} />
                <Box mt="nano" bg="#575757" height={12} width={180} />
              </Box>
            )}
            <TouchableOpacity onPress={handleToggleBalanceVisibility}>
              <IconLegacy name={balanceVisible ? 'EyeOff' : 'EyeOpen'} size={32} color="white" />
            </TouchableOpacity>
          </Box>
        </Box>
      </LinearGradient>
      <Box display="flex" flexDirection="row" ml="xxxs" mr="xxxs" justifyContent="space-between" top={-30}>
        <LinearGradient
          colors={selectedBalance === BalanceType.FUTURE ? ['#48515A', '#2B3034'] : ['#fff', '#fff']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0.0 }}
          style={[{ padding: 20, marginRight: 10 }, styles.card]}
          onTouchStart={() => changeSelectedBalance(BalanceType.FUTURE)}
        >
          <IconLegacy name="MoneyGreen" mr="nano" size={32} color={selectedBalance === BalanceType.FUTURE ? 'white' : '#323232'} />
          <Typography
            fontFamily="nunitoBold"
            fontSize={12}
            color={selectedBalance === BalanceType.FUTURE ? 'white' : '#323232'}
          >
            {'LANÇAMENTOS \nFUTUROS'}
          </Typography>
        </LinearGradient>

        <LinearGradient
          colors={selectedBalance === BalanceType.EXPIRE ? ['#48515A', '#2B3034'] : ['#fff', '#fff']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0.0 }}
          style={[{ padding: 20 }, styles.card]}
          onTouchStart={() => changeSelectedBalance(BalanceType.EXPIRE)}
        >
          <IconLegacy name="MoneyRed" mr="nano" size={32} color={selectedBalance === BalanceType.EXPIRE ? 'white' : '#323232'} />
          <Typography
            fontFamily="nunitoBold"
            fontSize={12}
            color={selectedBalance === BalanceType.EXPIRE ? 'white' : '#323232'}
          >
            {'VALOR A \nEXPIRAR'}
          </Typography>
        </LinearGradient>
      </Box>
      {selectedBalance === BalanceType.EXPIRE && (
      <Box ml="xxxs" mr="xxxs">
        <Typography fontFamily="reservaSansLight" fontSize={3} color="preto">
          VALOR A EXPIRAR
        </Typography>
        <PriceCustom
          fontFamily="reservaSansBold"
          sizeInterger={42}
          sizeDecimal={24}
          num={
          (Number(userExpireBalance?.totalExpireBalanceInCents)) || 0
        }
          color="preto"
        />
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            mt="xxs"
            justifyContent="space-between"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 6 }}
          >
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Valor
              </Typography>
            </Box>
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Válido até
              </Typography>
            </Box>
          </Box>
          {(userExpireBalance?.cashbackToExpire || []).map((operation) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              style={{
                borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 12, paddingTop: 12,
              }}
            >
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  R$
                  {' '}
                  {(Number(operation.expireCashbackAmount))}
                </Typography>
              </Box>
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  {formatDate(operation.expireAt)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      )}
      {selectedBalance === BalanceType.FUTURE && (
      <Box ml="xxxs" mr="xxxs">
        <Typography fontFamily="reservaSansLight" fontSize={3} color="preto">
          LANÇAMENTOS FUTUROS
        </Typography>
        <PriceCustom
          fontFamily="reservaSansBold"
          sizeInterger={42}
          sizeDecimal={24}
          num={totalPending || 0}
          color="preto"
        />
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            mt="xxs"
            justifyContent="space-between"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 6 }}
          >
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Valor
              </Typography>
            </Box>
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Creditado em
              </Typography>
            </Box>
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Disponível em
              </Typography>
            </Box>
          </Box>
          { userOperationsFiltered && userOperationsFiltered.map((operation: any) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              style={{
                borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 12, paddingTop: 12,
              }}
            >
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  R$
                  {' '}
                  {operation?.cashbackAmountInCents}
                </Typography>
              </Box>
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  {formatDate(operation?.createdAt)}
                </Typography>
              </Box>
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  {formatDate(operation?.settlementDate)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      )}
      {selectedBalance === BalanceType.ACTIVE && (
      <Box ml="xxxs" mr="xxxs">
        <Box style={{
          marginTop: 12, display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: '',
        }}
        >
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.ALL ? '#FFF' : '#EFEFEF',
          }]}
          >
            <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.ALL)}>
              <Typography fontFamily="reservaSansRegular" fontSize={15} color="preto">
                Tudo
              </Typography>
            </TouchableOpacity>
          </Box>
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.CONFIRMED ? '#FFF' : '#EFEFEF',
          }]}
          >
            <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.CONFIRMED)}>
              <Typography fontFamily="reservaSansRegular" fontSize={defaultFontSize} color="preto">
                Confirmado
              </Typography>
            </TouchableOpacity>
          </Box>
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.PENDING ? '#FFF' : '#EFEFEF',
          }]}
          >
            <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.PENDING)}>
              <Typography fontFamily="reservaSansRegular" fontSize={defaultFontSize} color="preto">
                Pendente
              </Typography>
            </TouchableOpacity>
          </Box>
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.CANCELED ? '#FFF' : '#EFEFEF',
          }]}
          >
            <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.CANCELED)}>
              <Typography fontFamily="reservaSansRegular" fontSize={defaultFontSize} color="preto">
                Cancelado
              </Typography>
            </TouchableOpacity>
          </Box>
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.EXPIRED ? '#FFF' : '#EFEFEF',
          }]}
          >
            <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.EXPIRED)}>
              <Typography fontFamily="reservaSansRegular" fontSize={defaultFontSize} color="preto">
                Expirado
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box
          bg="white"
          style={{
            borderRadius: 10,
            top: -15,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
            minHeight: 300,
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 6 }}
          >
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Tipo
              </Typography>
            </Box>
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Cashback
              </Typography>
            </Box>
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Data
              </Typography>
            </Box>
            <Box style={{ flex: 1 }}>
              <Typography fontFamily="nunitoBold" fontSize={14} color="preto">
                Status
              </Typography>
            </Box>
          </Box>
          { userOperationsFiltered && userOperationsFiltered.map((operation: any) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              style={{
                borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 12, paddingTop: 12,
              }}
            >
              <Box style={{ flex: 1 }}>
                {operation.status == 'available' ? (
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="#38A238">
                    Crédito
                  </Typography>
                ) : (
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="#D71921">
                    Débito
                  </Typography>
                )}
              </Box>
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  {operation?.cashbackAmountInCents > 0 && (
                  <PriceCustom
                    fontFamily="nunitoRegular"
                    sizeInterger={14}
                    sizeDecimal={11}
                    num={operation.cashbackAmountInCents || 0}
                  />
                  )}
                </Typography>
              </Box>
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  {formatDate(operation.settlementDate)}
                </Typography>
              </Box>
              <Box style={{ flex: 1 }}>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="preto">
                  {convertCashbackStatus(operation.status)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      )}
      {selectedBalance === BalanceType.FUTURE || selectedBalance === BalanceType.EXPIRE ? (
        <Box m="xxxs" mt="xs">
          <Button
            onPress={() => {
              changeSelectedBalance(BalanceType.ACTIVE);
              changeOperationFilter(FilterOptions.ALL);
            }}
            title="VOLTAR PARA STATUS"
            style={{
              borderColor: '#333333',
              borderWidth: 1,
              width: '100%',
              padding: 16,
            }}
          />
        </Box>
      ) : (<></>)}
    </>
  );
}
