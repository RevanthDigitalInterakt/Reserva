import React, { useCallback } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, Button, Divider, TextField } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { IdentifyCustomer } from "../../../services/vtexService";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";


export const EnterYourEmail = () => {
    const navigation = useNavigation();
    const { orderForm } = useCart();
    const [email, setEmail] = useState<string>("");

    const hasEmail = useCallback((): boolean => {
        return email.length > 0
    }, [email]);

    const onCheckCustomerMail = async () => {
        const hasCustomer = await IdentifyCustomer(orderForm?.orderFormId, email);

        if (!hasCustomer) {
            navigation.navigate("EditProfile");
            return;
        }

        navigation.navigate("SummaryScreen", { paymentType: "PIX" })
    }

    return (
        <SafeAreaView flex={1} backgroundColor={"white"}>
            <TopBarBackButton showShadow />
            <ScrollView>
                <Box paddingX={"xxxs"} paddingY={"sm"}>
                    <Box>
                        <Typography variant={"subtituloSessoes"}>
                            Informe seu e-mail para continuar:
                        </Typography>
                    </Box>
                    <Box marginY="xs">
                        <TextField
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder={"Digite seu e-mail"}
                        />
                    </Box>
                    <Button
                        onPress={onCheckCustomerMail}
                        title="CONTINUAR"
                        variant="primarioEstreito"
                        inline
                        marginX="xxl"
                        disabled={!hasEmail()}
                    />
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};

