import React, { useState, useEffect } from "react";
import { Platform, SafeAreaView, ScrollView, } from "react-native";
import {
    Typography,
    Box,
    Button,
    TextField,
    DropDown,
} from 'reserva-ui';
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";

export const WithdrawInStore = () => {
    const navigation = useNavigation();
    const [state, setState] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [disabled, setDisabled] = useState(true);
    const hairline = Platform.OS == 'android' ? "hairline" : null
    const CheckDisabledCep = () => {
        if (cep === "") {
            setDisabled(true)
        } else {
            setDisabled(false)
        }

    }
    const CheckStateCity = () => {
        if (state === "" || city === "") {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    useEffect(() => {
        CheckDisabledCep();
    }, [cep])
    useEffect(() => {
        CheckStateCity();
    }, [state, city])

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

                        <Box flexDirection={"row"} mt={"micro"}>
                            <Box
                                borderTopWidth={hairline}
                                flex={1}
                                borderBottomWidth={hairline}
                                borderLeftWidth={hairline}
                                borderRightWidth={hairline}
                                borderRadius="nano"
                            >
                                <DropDown
                                    data={[
                                        { label: "UF", value: "" },
                                        { label: "AC", value: "1" },
                                        { label: "AL", value: "2" },
                                    ]}
                                    onSelect={(value) => { setState(value) }}
                                ></DropDown>
                            </Box>
                            <Box
                                marginLeft={"xxs"}
                                borderTopWidth={hairline}
                                flex={3}
                                borderBottomWidth={hairline}
                                borderLeftWidth={hairline}
                                borderRightWidth={hairline}
                                borderRadius="nano"
                            >
                                <DropDown
                                    data={[
                                        { label: "Cidade", value: "" },
                                        { label: "Aracruz", value: "1" },
                                        { label: "Vila Velha", value: "2" },
                                    ]}
                                    onSelect={(value) => { setCity(value) }}
                                ></DropDown>
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
