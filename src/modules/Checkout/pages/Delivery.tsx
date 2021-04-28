import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from "react-native";
import {
    Typography,
    Box,
    ProgressBar,
    ProductHorizontalListCard,
    Divider,
    Button,
    Icon,
    Toggle,
    TextField
} from 'reserva-ui';
import { PriceCustom } from "../../Home/components/PriceCustom";
// import { useNavigation } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const DeliveryScreen = () => {
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1)
    return (
        <SafeAreaView
            style={{ justifyContent: "space-between", flex: 1, backgroundColor: "#FFF" }}
        >
            <ScrollView>
                <TopBarBackButton showShadow />
                <Box
                    bg={"white"}
                    paddingX={"micro"}
                    paddingY={"xxs"}
                >
                    <Box variant={"container"}>
                        <Box flexDirection="row">
                            <Typography
                                fontFamily={"nunitoSemiBold"}
                                fontSize={13}
                            >
                                Faltam apenas R$29,90 para ganhar
                            </Typography>
                            <Typography> </Typography>
                            <Typography
                                variant={"precoPromocional2"}
                                color={"vermelhoFechadoRSV"}
                            >
                                frete grátis
                            </Typography>
                        </Box>

                        <Box width="100%" paddingX={"xxxs"}>
                            <ProgressBar
                                colorLabel={"fullBlack"}
                                colorBar={"neutroFrio1"}
                                colorProgress={"neutroFrio2"}
                                value={90}
                                max={100}
                                showPercent={false}
                                barHeight={5}
                            />
                        </Box>
                    </Box>


                </Box>

            </ScrollView>

            <Button title='IR PARA ENTREGA' variant='primarioEstreito' inline />
        </SafeAreaView >
    );
};
