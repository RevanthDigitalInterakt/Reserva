  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MyWalletView = MyWalletView;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeLinearGradient = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var styles = _reactNative.StyleSheet.create({
    card: {
      backgroundColor: 'white',
      borderRadius: 4,
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6
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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5
    }
  });
  var defaultFontSize = 13.3;
  function MyWalletView(_ref) {
    var balanceVisible = _ref.balanceVisible,
      balance = _ref.balance,
      formatDate = _ref.formatDate,
      operationFilter = _ref.operationFilter,
      convertCentsToReal = _ref.convertCentsToReal,
      userOperationsFiltered = _ref.userOperationsFiltered,
      userExpireBalance = _ref.userExpireBalance,
      totalPending = _ref.totalPending,
      handleToggleBalanceVisibility = _ref.handleToggleBalanceVisibility,
      changeOperationFilter = _ref.changeOperationFilter,
      selectedBalance = _ref.selectedBalance,
      changeSelectedBalance = _ref.changeSelectedBalance;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNativeLinearGradient.default, {
        colors: ['#414040', '#000000'],
        start: {
          x: 0,
          y: 1
        },
        end: {
          x: 1,
          y: 0.0
        },
        style: {
          height: 220,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          padding: 16
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              fontFamily: "reservaSerifBold",
              fontSize: 32,
              color: "white",
              children: "Cashback"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              fontFamily: "reservaSansRegular",
              fontSize: 16,
              color: "white",
              children: "Boas-vindas \xE0 sua carteira"
            })]
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          mt: "xxs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontFamily: "reservaSansLight",
            fontSize: 2,
            color: "white",
            children: "SALDO DISPON\xCDVEL"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            children: [balanceVisible ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              fontFamily: "reservaSansLight",
              fontSize: 2,
              color: "white",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).PriceCustom, {
                fontFamily: "reservaSansBold",
                sizeInterger: 42,
                sizeDecimal: 24,
                num: balance || 0,
                color: "white"
              })
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mt: "xxxs",
                bg: "#575757",
                height: 12,
                width: 200
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mt: "nano",
                bg: "#575757",
                height: 12,
                width: 180
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TouchableOpacity, {
              onPress: handleToggleBalanceVisibility,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).IconLegacy, {
                name: balanceVisible ? 'EyeOff' : 'EyeOpen',
                size: 32,
                color: "white"
              })
            })]
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        display: "flex",
        flexDirection: "row",
        ml: "xxxs",
        mr: "xxxs",
        justifyContent: "space-between",
        top: -30,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNativeLinearGradient.default, {
          colors: selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.FUTURE ? ['#48515A', '#2B3034'] : ['#fff', '#fff'],
          start: {
            x: 0,
            y: 1
          },
          end: {
            x: 1,
            y: 0.0
          },
          style: [{
            padding: 20,
            marginRight: 10
          }, styles.card],
          onTouchStart: function onTouchStart() {
            return changeSelectedBalance(_$$_REQUIRE(_dependencyMap[10]).BalanceType.FUTURE);
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).IconLegacy, {
            name: "MoneyGreen",
            mr: "nano",
            size: 32,
            color: selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.FUTURE ? 'white' : '#323232'
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 12,
            color: selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.FUTURE ? 'white' : '#323232',
            children: 'LANÇAMENTOS \nFUTUROS'
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNativeLinearGradient.default, {
          colors: selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.EXPIRE ? ['#48515A', '#2B3034'] : ['#fff', '#fff'],
          start: {
            x: 0,
            y: 1
          },
          end: {
            x: 1,
            y: 0.0
          },
          style: [{
            padding: 20
          }, styles.card],
          onTouchStart: function onTouchStart() {
            return changeSelectedBalance(_$$_REQUIRE(_dependencyMap[10]).BalanceType.EXPIRE);
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).IconLegacy, {
            name: "MoneyRed",
            mr: "nano",
            size: 32,
            color: selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.EXPIRE ? 'white' : '#323232'
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 12,
            color: selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.EXPIRE ? 'white' : '#323232',
            children: 'VALOR A \nEXPIRAR'
          })]
        })]
      }), selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.EXPIRE && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        ml: "xxxs",
        mr: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          fontFamily: "reservaSansLight",
          fontSize: 3,
          color: "preto",
          children: "VALOR A EXPIRAR"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).PriceCustom, {
          fontFamily: "reservaSansBold",
          sizeInterger: 42,
          sizeDecimal: 24,
          num: Number(userExpireBalance == null ? undefined : userExpireBalance.totalExpireBalanceInCents) || 0,
          color: "preto"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            display: "flex",
            flexDirection: "row",
            mt: "xxs",
            justifyContent: "space-between",
            style: {
              borderBottomWidth: 1,
              borderBottomColor: '#E8E8E8',
              paddingBottom: 6
            },
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Valor"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "V\xE1lido at\xE9"
              })
            })]
          }), ((userExpireBalance == null ? undefined : userExpireBalance.cashbackToExpire) || []).map(function (operation) {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              style: {
                borderBottomWidth: 1,
                borderBottomColor: '#E8E8E8',
                paddingBottom: 12,
                paddingTop: 12
              },
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: ["R$", ' ', Number(operation.expireCashbackAmount)]
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: formatDate(operation.expireAt)
                })
              })]
            });
          })]
        })]
      }), selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.FUTURE && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        ml: "xxxs",
        mr: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          fontFamily: "reservaSansLight",
          fontSize: 3,
          color: "preto",
          children: "LAN\xC7AMENTOS FUTUROS"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).PriceCustom, {
          fontFamily: "reservaSansBold",
          sizeInterger: 42,
          sizeDecimal: 24,
          num: convertCentsToReal(totalPending || 0),
          color: "preto"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            display: "flex",
            flexDirection: "row",
            mt: "xxs",
            justifyContent: "space-between",
            style: {
              borderBottomWidth: 1,
              borderBottomColor: '#E8E8E8',
              paddingBottom: 6
            },
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Valor"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Creditado em"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Dispon\xEDvel em"
              })
            })]
          }), userOperationsFiltered && userOperationsFiltered.map(function (operation) {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              style: {
                borderBottomWidth: 1,
                borderBottomColor: '#E8E8E8',
                paddingBottom: 12,
                paddingTop: 12
              },
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: ["R$", ' ', convertCentsToReal(operation == null ? undefined : operation.cashbackAmountInCents)]
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: formatDate(operation == null ? undefined : operation.createdAt)
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: formatDate(operation == null ? undefined : operation.settlementDate)
                })
              })]
            });
          })]
        })]
      }), selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.ACTIVE && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        ml: "xxxs",
        mr: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          style: {
            marginTop: 12,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: ''
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            style: [styles.tab, {
              backgroundColor: operationFilter === _$$_REQUIRE(_dependencyMap[10]).FilterOptions.ALL ? '#FFF' : '#EFEFEF'
            }],
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TouchableOpacity, {
              onPress: function onPress() {
                return changeOperationFilter(_$$_REQUIRE(_dependencyMap[10]).FilterOptions.ALL);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: 15,
                color: "preto",
                children: "Tudo"
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            style: [styles.tab, {
              backgroundColor: operationFilter === _$$_REQUIRE(_dependencyMap[10]).FilterOptions.CONFIRMED ? '#FFF' : '#EFEFEF'
            }],
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TouchableOpacity, {
              onPress: function onPress() {
                return changeOperationFilter(_$$_REQUIRE(_dependencyMap[10]).FilterOptions.CONFIRMED);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: defaultFontSize,
                color: "preto",
                children: "Confirmado"
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            style: [styles.tab, {
              backgroundColor: operationFilter === _$$_REQUIRE(_dependencyMap[10]).FilterOptions.PENDING ? '#FFF' : '#EFEFEF'
            }],
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TouchableOpacity, {
              onPress: function onPress() {
                return changeOperationFilter(_$$_REQUIRE(_dependencyMap[10]).FilterOptions.PENDING);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: defaultFontSize,
                color: "preto",
                children: "Pendente"
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            style: [styles.tab, {
              backgroundColor: operationFilter === _$$_REQUIRE(_dependencyMap[10]).FilterOptions.CANCELED ? '#FFF' : '#EFEFEF'
            }],
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TouchableOpacity, {
              onPress: function onPress() {
                return changeOperationFilter(_$$_REQUIRE(_dependencyMap[10]).FilterOptions.CANCELED);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: defaultFontSize,
                color: "preto",
                children: "Cancelado"
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            style: [styles.tab, {
              backgroundColor: operationFilter === _$$_REQUIRE(_dependencyMap[10]).FilterOptions.EXPIRED ? '#FFF' : '#EFEFEF'
            }],
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TouchableOpacity, {
              onPress: function onPress() {
                return changeOperationFilter(_$$_REQUIRE(_dependencyMap[10]).FilterOptions.EXPIRED);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: defaultFontSize,
                color: "preto",
                children: "Expirado"
              })
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          bg: "white",
          style: {
            borderRadius: 10,
            top: -15,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
            minHeight: 300
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            style: {
              borderBottomWidth: 1,
              borderBottomColor: '#E8E8E8',
              paddingBottom: 6
            },
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Tipo"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Cashback"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Data"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                color: "preto",
                children: "Status"
              })
            })]
          }), userOperationsFiltered && userOperationsFiltered.map(function (operation) {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              style: {
                borderBottomWidth: 1,
                borderBottomColor: '#E8E8E8',
                paddingBottom: 12,
                paddingTop: 12
              },
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: operation.status == 'available' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "#38A238",
                  children: "Cr\xE9dito"
                }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "#D71921",
                  children: "D\xE9bito"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: (operation == null ? undefined : operation.cashbackAmountInCents) > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).PriceCustom, {
                    fontFamily: "nunitoRegular",
                    sizeInterger: 14,
                    sizeDecimal: 11,
                    num: operation.cashbackAmountInCents || 0
                  })
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: formatDate(operation.settlementDate)
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                style: {
                  flex: 1
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  color: "preto",
                  children: (0, _$$_REQUIRE(_dependencyMap[11]).convertCashbackStatus)(operation.status)
                })
              })]
            });
          })]
        })]
      }), selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.FUTURE || selectedBalance === _$$_REQUIRE(_dependencyMap[10]).BalanceType.EXPIRE ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        m: "xxxs",
        mt: "xs",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
          onPress: function onPress() {
            changeSelectedBalance(_$$_REQUIRE(_dependencyMap[10]).BalanceType.ACTIVE);
            changeOperationFilter(_$$_REQUIRE(_dependencyMap[10]).FilterOptions.ALL);
          },
          title: "VOLTAR PARA STATUS",
          style: {
            borderColor: '#333333',
            borderWidth: 1,
            width: '100%',
            padding: 16
          }
        })
      }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {})]
    });
  }
