import React, { useState, useEffect } from "react";
import { Platform, SafeAreaView, ScrollView, Picker } from "react-native";
import {
    Typography,
    Box,
    Button,
    TextField,
    DropDown,
    OutlineInput,
    Icon
} from 'reserva-ui';
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
export const WithdrawInStore = () => {
    const navigation = useNavigation();

    const [openState, setOpenState] = useState(false);
    const [opencity, setOpenCity] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");
    const [state, setState] = useState("UF")
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("Cidade");
    const [disabled, setDisabled] = useState(true);
    const hairline = Platform.OS == 'android' ? "hairline" : null

    const dataState = [
        { label: "UF", value: "" },
        { label: "AC", value: "1" },
        { label: "AL", value: "2" },
    ]

    const dataCity = [
        { label: "Cidade", value: "" },
        { label: "Vila Velha", value: "1" },
        { label: "Vitória", value: "2" },
    ]


    return (
        <SafeAreaView
            flex={1}
            backgroundColor={"white"}
        >
            <TopBarBackButton showShadow />
            <ScrollView>
                <Box
                    paddingX={"xxxs"}
                    paddingY={"sm"}
                >
                    <Box marginBottom={"xxs"}>
                        <Typography fontFamily={"reservaSerifRegular"} fontSize={20}>
                            Retirar na loja
                        </Typography>
                    </Box>

                    <Box marginBottom="xxxs">
                        <Typography variant={"tituloSessao"} >
                            Digite o seu CEP para localizarmos as lojas mais próximas de você.
                        </Typography>
                    </Box>

                    <Box flexDirection={"row"}>
                        <Box flex={1} marginRight={"micro"}>
                            <TextField
                                maskType={"zip-code"}
                                value={cep}
                                onChangeText={(cep) => { setCep(cep); }}
                                placeholder={"Digite aqui o seu CEP"}
                            />
                        </Box>
                        <Box >
                            <Button
                                onPress={() => navigation.navigate('MapScreen')}
                                title='MAPA'
                                variant='primarioEstreito'
                            />
                        </Box>

                    </Box>

                    <Box mt="sm" >
                        <Typography variant={"tituloSessao"}>Ou selecione seu estado e cidade:</Typography>

                        <Box>
                            <Modal
                                isVisible={openState}
                                onBackdropPress={() => setOpenState(!openState)}
                            >
                                <Box bg="white" width={"100%"} py="micro" px="nano" >
                                    {dataState.map((item) => (
                                        <Button alignSelf="flex-start" width="100%" onPress={() => { setOpenState(false); setState(item.label) }}>
                                            <Box height={35} width="100%" justifyContent="center">
                                                <Typography>{item.label}</Typography>
                                            </Box>
                                        </Button>
                                    ))}

                                </Box>
                            </Modal>
                        </Box>

                        <Box>
                            <Modal
                                isVisible={opencity}
                                onBackdropPress={() => setOpenCity(!opencity)}
                            >
                                <Box bg="white" width={"100%"} py="micro" px="nano" >
                                    {dataCity.map((item) => (
                                        <Button alignSelf="flex-start" width="100%" onPress={() => { setOpenCity(false); setCity(item.label) }}>
                                            <Box height={35} width="100%" justifyContent="center">
                                                <Typography>{item.label}</Typography>
                                            </Box>
                                        </Button>
                                    ))}

                                </Box>
                            </Modal>
                        </Box>

                        <Box flexDirection={"row"} mt={"micro"} height={40}>
                            <Box flex={1}>
                                <Button flexDirection="row" onPress={() => setOpenState(!openState)}>
                                    <Box
                                        borderTopWidth={"hairline"}
                                        height={40}
                                        borderBottomWidth={"hairline"}
                                        borderLeftWidth={"hairline"}
                                        borderRightWidth={"hairline"}
                                        borderRadius="nano"
                                        alignItems={"center"}
                                        paddingLeft="nano"
                                        flexDirection={"row"}
                                    >
                                        <Typography>{state}</Typography>
                                        <Box
                                            marginLeft="xxs"
                                            borderLeftWidth={"hairline"}
                                            height={40}
                                            width={30}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Icon name={'ArrowDown'} size={20} />
                                        </Box>
                                    </Box>
                                </Button>
                            </Box>
                            <Box flex={3} marginLeft="xxs">
                                <Button flexDirection="row" onPress={() => setOpenCity(!opencity)} >
                                    <Box
                                        flex={1}
                                        borderTopWidth={"hairline"}
                                        height={40}
                                        borderBottomWidth={"hairline"}
                                        borderLeftWidth={"hairline"}
                                        borderRightWidth={"hairline"}
                                        borderRadius="nano"
                                        alignItems={"center"}
                                        paddingLeft="nano"
                                        flexDirection={"row"}
                                    >
                                        <Typography>{city}</Typography>
                                        <Box alignItems="flex-end" flex={1}>
                                            <Box
                                                marginLeft="md"
                                                borderLeftWidth={"hairline"}
                                                height={40}
                                                width={30}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Icon name={'ArrowDown'} size={20} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </ScrollView>

            <Button
                onPress={() => navigation.navigate("NearbyStores")}
                title="CONTINUAR"
                variant="primarioEstreito"
                disabled={false}
                inline
            />
        </SafeAreaView >
    );
};
