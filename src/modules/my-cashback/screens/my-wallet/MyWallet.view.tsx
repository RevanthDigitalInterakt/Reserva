import { GetExpireBalanceResponse, GetUserOperationsResponse } from "modules/my-cashback/api/MyCashbackAPI";
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { Box, Button, Icon, Typography } from "@usereservaapp/reserva-ui";
import { PriceCustom } from "../../../../modules/Checkout/components/PriceCustom";
import { BalanceType, FilterOptions } from "./MyWallet.container";

export interface MyWalletViewProps {
  balanceVisible: boolean;
  userOperations: GetUserOperationsResponse | null;
  balance: number;
  userOperationsFiltered: any;
  totalPending: number | undefined;
  operationFilter: FilterOptions;
  selectedBalance: BalanceType;
  userExpireBalance: GetExpireBalanceResponse | null;
  changeSelectedBalance: (balanceType: BalanceType) => void;
  convertCentsToReal: (cents: number) => number;
  formatDate: (date: string) => string;
  handleToggleBalanceVisibility: () => void;
  changeOperationFilter: (filter: FilterOptions) => void;
}

export const MyWalletView = (
  {
    balanceVisible,
    balance,
    userOperations,
    formatDate,
    operationFilter,
    convertCentsToReal,
    userOperationsFiltered,
    userExpireBalance,
    totalPending,
    handleToggleBalanceVisibility,
    changeOperationFilter,
    selectedBalance,
    changeSelectedBalance,
  }: MyWalletViewProps
) => {
  return (
    <Fragment>
      <LinearGradient
        colors={['#414040', '#000000']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.}}
        style={{ height: 220, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, padding: 16 }}
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
          <Icon name="Question" size={32} color="white" />
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
                <Box mt="xxxs" bg="#575757" height={12} width={200}>
                </Box>
                <Box mt="nano" bg="#575757" height={12} width={180}>
                </Box>
              </Box>
            )}
            <TouchableOpacity onPress={handleToggleBalanceVisibility}>
              <Icon name={balanceVisible ? "EyeOff" : "EyeOpen"} size={32} color="white" />
            </TouchableOpacity>
          </Box>
        </Box>
      </LinearGradient>
      <Box display="flex" flexDirection="row" ml="xxxs" mr="xxxs" justifyContent="space-between" top={-30}>
        <LinearGradient
          colors={selectedBalance === BalanceType.FUTURE ? ['#48515A', '#2B3034'] : ['#fff', '#fff']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0.}}
          style={[{ padding: 20, marginRight: 10 }, styles.card]}
          onTouchStart={() => changeSelectedBalance(BalanceType.FUTURE)}
        >
          <Icon name="MoneyGreen" mr="nano" size={32} color={selectedBalance === BalanceType.FUTURE ? "white" : "#323232"} />
          <Typography
            fontFamily="nunitoBold"
            fontSize={12}
            color={selectedBalance === BalanceType.FUTURE ? "white" : "#323232"}
          >
            LANÇAMENTOS FUTUROS
          </Typography>
        </LinearGradient>

        <LinearGradient
          colors={selectedBalance === BalanceType.EXPIRE ? ['#48515A', '#2B3034'] : ['#fff', '#fff']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0.}}
          style={[{ padding: 20 }, styles.card]}
          onTouchStart={() => changeSelectedBalance(BalanceType.EXPIRE)}
        >
          <Icon name="MoneyRed" mr="nano" size={32} color={selectedBalance === BalanceType.EXPIRE ? "white" : "#323232"} />
          <Typography
            fontFamily="nunitoBold"
            fontSize={12}
            color={selectedBalance === BalanceType.EXPIRE ? "white" : "#323232"}
          >
            {`VALOR A \nEXPIRAR`}
          </Typography>
        </LinearGradient>
      </Box>
      {selectedBalance === BalanceType.EXPIRE && (
        <Box ml="xxxs" mr="xxxs">
          <Typography fontFamily="reservaSansLight" fontSize={3} color="black">
            VALOR A EXPIRAR
          </Typography>
          <PriceCustom
            fontFamily="reservaSansBold"
            sizeInterger={42}
            sizeDecimal={24}
            num={convertCentsToReal(Number(userExpireBalance?.data.totalExpireBalanceInCents)) || 0}
            color="black"
          />
          <Box>
            <Box
              display="flex"
              flexDirection="row"
              mt="xxs"
              justifyContent="space-between"
              style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 6,  }}
            >
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Valor
                </Typography>
              </Box>
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Válido até
                </Typography>
              </Box>
            </Box>
            { userExpireBalance && userExpireBalance.data.cashbackToExpireData.map((operation: any) => (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 12, paddingTop: 12 }}
              >
                <Box style={{ flex: 1}}>
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                    R$ {convertCentsToReal(Number(operation.expire_cashback_amount))}
                  </Typography>
                </Box>
                <Box style={{ flex: 1}}>
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                    {formatDate(operation.expire_at)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {selectedBalance === BalanceType.FUTURE && (
        <Box ml="xxxs" mr="xxxs">
          <Typography fontFamily="reservaSansLight" fontSize={3} color="black">
            LANÇAMENTOS FUTUROS
          </Typography>
          <PriceCustom
            fontFamily="reservaSansBold"
            sizeInterger={42}
            sizeDecimal={24}
            num={convertCentsToReal(totalPending) || 0}
            color="black"
          />
          <Box>
            <Box
              display="flex"
              flexDirection="row"
              mt="xxs"
              justifyContent="space-between"
              style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 6,  }}
            >
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Valor
                </Typography>
              </Box>
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Creditado em
                </Typography>
              </Box>
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Disponível em
                </Typography>
              </Box>
            </Box>
            { userOperationsFiltered && userOperationsFiltered.map((operation: any) => (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 12, paddingTop: 12 }}
              >
                <Box style={{ flex: 1}}>
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                    R$ {convertCentsToReal(operation.cashback_amount_in_cents)}
                  </Typography>
                </Box>
                <Box style={{ flex: 1}}>
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                    {formatDate(operation.created_at)}
                  </Typography>
                </Box>
                <Box style={{ flex: 1}}>
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                    {formatDate(operation.settlement_date)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {selectedBalance === BalanceType.ACTIVE && (
        <Box ml="xxxs" mr="xxxs">
          <Typography fontFamily="reservaSerifMedium" fontSize={19} color="black">
            Extrato de cashback
          </Typography>
          <Box style={{ marginTop: 12, display: 'flex', flexDirection: 'row' }}>
            <Box style={[styles.tab, {
              backgroundColor: operationFilter === FilterOptions.ALL ? "#FFF" : "#EFEFEF",
            }]}>
              <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.ALL)}>
                <Typography fontFamily="reservaSansRegular" fontSize={16} color="black">
                  Tudo
                </Typography>
              </TouchableOpacity>
            </Box>
            <Box style={[styles.tab, {
              backgroundColor: operationFilter === FilterOptions.CREDIT ? "#FFF" : "#EFEFEF",
            }]}>
              <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.CREDIT)}>
                <Typography fontFamily="reservaSansRegular" fontSize={16} color="black">
                  Entrada
                </Typography>
              </TouchableOpacity>
            </Box>
            <Box style={[styles.tab, {
              backgroundColor: operationFilter === FilterOptions.DEBIT ? "#FFF" : "#EFEFEF",
            }]}>
              <TouchableOpacity onPress={() => changeOperationFilter(FilterOptions.DEBIT)}>
                <Typography fontFamily="reservaSansRegular" fontSize={16} color="black">
                  Saída
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
              shadowColor: "#000" ,
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
              style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 6,  }}
            >
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Tipo
                </Typography>
              </Box>
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Cashback
                </Typography>
              </Box>
              <Box style={{ flex: 1}}>
                <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                  Data
                </Typography>
              </Box>
            </Box>
            { userOperationsFiltered && userOperationsFiltered.map((operation: any) => (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 12, paddingTop: 12 }}
              >
                <Box style={{ flex: 1}}>
                  {operation.cashback_amount_in_cents > 0 ? (
                    <Typography fontFamily="nunitoRegular" fontSize={14} color="#38A238">
                      Crédito
                    </Typography>
                  ) : (
                    <Typography fontFamily="nunitoRegular" fontSize={14} color="#D71921">
                      Débito
                    </Typography>
                  )}
                </Box>
                <Box style={{ flex: 1}}>
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                    {operation.cashback_amount_in_cents > 0 && `+ ${convertCentsToReal(operation.cashback_amount_in_cents)}`}
                    {operation.applied_balance_in_cents > 0 && `- ${convertCentsToReal(operation.applied_balance_in_cents)}`}
                  </Typography>
                </Box>
                <Box style={{ flex: 1}}>
                  <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                    {formatDate(operation.created_at)}
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
            title="VOLTAR PARA EXTRATO"
            style={{
              borderColor: '#333333',
              borderWidth: 1,
              width: '100%',
              padding: 16
            }}
          />
        </Box>
      ) : (<></>)}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    flex: 1,
    shadowColor: "#000" ,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    backgroundColor: '#EFEFEF',
    padding: 8,
    textAlign: 'left',
    marginRight: 5,
    paddingBottom: 20,
    zIndex: -1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  }
});
