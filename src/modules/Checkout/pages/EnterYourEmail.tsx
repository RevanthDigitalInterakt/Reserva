import React, { useCallback } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, Button, Divider, TextField } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";



export const EnterYourEmail = () => {
    const navigation = useNavigation();
    const [emailCheckout, setEmailCheckout] = React.useState({
        email: "danilo.sousa@globalsys.com.br",
    });

    const hasEmail = useCallback((): boolean => {
        const { email } = emailCheckout;
        if (email?.length) {
            return true;
        }
        return false;
    }, [emailCheckout]);

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
                            value={emailCheckout.email}
                            onChangeText={(text) => setEmailCheckout({ email: text })}
                            placeholder={"Digite seu e-mail"}
                        />
                    </Box>
                    <Button
                        onPress={() =>
                            navigation.navigate("SummaryScreen", { paymentType: "PIX" })
                        }
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

