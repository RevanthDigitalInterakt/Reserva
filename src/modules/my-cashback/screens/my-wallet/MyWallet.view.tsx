import { GetUserOperationsResponse } from "modules/my-cashback/api/MyCashbackAPI";
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { Box, Icon, Typography } from "reserva-ui";
import { PriceCustom } from "../../../../modules/Checkout/components/PriceCustom";
import { FilterOptions } from "./MyWallet.container";

export interface MyWalletViewProps {
  balanceVisible: boolean;
  userOperations: GetUserOperationsResponse | null;
  balance: number;
  userOperationsFiltered: any;
  operationFilter: FilterOptions;
  convertCentsToReal: (cents: number) => string;
  formatDate: (date: string) => string;
  handleToggleBalanceVisibility: () => void;
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
    handleToggleBalanceVisibility,
  }: MyWalletViewProps
) => {
  console.log("operations", userOperations);
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
        <Box
          p={20}
          mr="nano"
          style={styles.card}
        >
          <Icon name="MoneyGreen" mr="nano" size={32} color="#414040" />
          <Typography
            fontFamily="nunitoBold"
            fontSize={12}
            color="black"
          >
            LANÇAMENTOS FUTUROS
          </Typography>
        </Box>
        <Box
          p={20}
          style={styles.card}
        >
          <Icon name="MoneyRed" mr="nano" size={32} color="black" />
          <Typography
            fontFamily="nunitoBold"
            fontSize={12}
            color="black"
          >
            {`VALOR A \nEXPIRAR`}
          </Typography>
        </Box>
      </Box>
      <Box ml="xxxs" mr="xxxs">
        <Typography fontFamily="reservaSerifMedium" fontSize={19} color="black">
          Extrato de cashback
        </Typography>
        <Box style={{ marginTop: 12, display: 'flex', flexDirection: 'row' }}>
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.ALL ? "#FFF" : "#EFEFEF",
          }]}>
            <Typography fontFamily="reservaSansRegular" fontSize={16} color="black">
              Tudo
            </Typography>
          </Box>
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.CREDIT ? "#FFF" : "#EFEFEF",
          }]}>
            <Typography fontFamily="reservaSansRegular" fontSize={16} color="black">
              Entrada
            </Typography>
          </Box>
          <Box style={[styles.tab, {
            backgroundColor: operationFilter === FilterOptions.DEBIT ? "#FFF" : "#EFEFEF",
          }]}>
            <Typography fontFamily="reservaSansRegular" fontSize={16} color="black">
              Saída
            </Typography>
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
            <Box>
              <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                Tipo
              </Typography>
            </Box>
            <Box>
              <Typography fontFamily="nunitoBold" fontSize={14} color="black">
                Cashback
              </Typography>
            </Box>
            <Box>
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
              <Box>
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
              <Box>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                  {operation.cashback_amount_in_cents > 0 && `+ ${convertCentsToReal(operation.cashback_amount_in_cents)}`}
                  {operation.applied_balance_in_cents > 0 && `- ${convertCentsToReal(operation.applied_balance_in_cents)}`}
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily="nunitoRegular" fontSize={14} color="black">
                  {formatDate(operation.created_at)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
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
