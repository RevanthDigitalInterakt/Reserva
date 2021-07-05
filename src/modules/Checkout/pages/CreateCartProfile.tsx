import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { useEffect } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, TextField, Typography } from "reserva-ui"
import { CepResponse } from "../../../config/brasilApi"
import { useCart } from "../../../context/CartContext"
import { RootStackParamList } from "../../../routes/StackNavigator"
import { CepVerify } from "../../../services/vtexService"
import { TopBarDefault } from "../../Menu/components/TopBarDefault"
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton"

interface CreateCartProfileProfile extends StackScreenProps<RootStackParamList, 'CreateCartProfile'> {

}

export const CreateCartProfile: React.FC<CreateCartProfileProfile> = ({ navigation, route }) => {
    const { addCustomer, addShippingData, getCepData } = useCart();
    const [loading, setLoading] = useState(false)
    const [showCepDescrption, setShowCepDescrption] = useState(false)
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        documentType: "CPF",
        document: '',
        phone: '',
        postalCode: '',
        neighborhood: '',
        state: '',
        street: '',
        number: '',
        complement: '',
        city: '',
    });

    const cepHandler = async (postalCode: string) => {
        const isValidPostalCode = postalCode.length == 8

        if (isValidPostalCode) {
            setLoading(true)
            const { street, neighborhood, city, state, cep, errors } = await CepVerify(postalCode)
            setShowCepDescrption(!!cep)
            setFields({
                ...fields,
                postalCode,
                street,
                neighborhood,
                city,
                state
            })
            setLoading(false)

        } else {
            setShowCepDescrption(false)
        }
    }


    const saveCustomer = async () => {
        const { firstName, lastName, document, documentType, phone } = fields;

        const isCustomerSave = await addCustomer({ firstName, lastName, document, documentType, phone });

        if (isCustomerSave) {
            // save address
            const receiverName = `${firstName} ${lastName}`;
            const { postalCode, state, number, neighborhood, complement, city, street } = fields;
            setLoading(true)
            const isAddressSaved = await addShippingData({
                postalCode,
                state,
                number,
                receiverName,
                neighborhood,
                addressType: "residential",
                country: "BRA",
                complement,
                city,
                street
            });
            setLoading(false)

            if (isAddressSaved) {
                navigation.navigate("DeliveryScreen")
            }
        }
    }

    return <SafeAreaView style={{ backgroundColor: '#ffffff' }} flex={1}>
        <TopBarDefaultBackButton loading={loading} />
        <ScrollView>
            <Box mx={20}>
                <Box mt={49}>
                    <Typography
                        fontFamily='reservaSerifRegular' fontSize={20} >Informe seus dados para continuar</Typography>
                </Box>
                <Box mt={20}>
                    <Typography fontFamily='nunitoRegular' fontSize={15}>Insira os dados do destinatario</Typography>
                </Box>

                <Box mt={10} flexDirection='row' justifyContent='space-between'>
                    <Box flex={1} marginRight='micro'>
                        <TextField placeholder='Nome'
                            value={fields.firstName}
                            onChangeText={(text) => setFields({ ...fields, firstName: text })}
                        />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            value={fields.lastName}
                            onChangeText={(text) => setFields({ ...fields, lastName: text })}
                            placeholder='Sobrenome' />
                    </Box>
                </Box>
                <Box mt={15}>
                    <TextField
                        value={fields.birthDate}
                        maskType="datetime"
                        onChangeText={(text) => setFields({ ...fields, birthDate: text })}
                        placeholder='Data de Nascimento' />
                </Box>
                <Box mt={15}>
                    <TextField
                        value={fields.document}
                        maskType="cpf"
                        onChangeText={(text) => setFields({ ...fields, document: text })}
                        placeholder='CPF' />
                </Box>
                <Box mt={15}>
                    <TextField
                        value={fields.phone}
                        maskType="cel-phone"
                        onChangeText={(text) => setFields({ ...fields, phone: text })}
                        placeholder='Telefone' />
                </Box>

                <Box mt={20}>
                    <Typography fontFamily='nunitoRegular' fontSize={15}>Insira o endereço do destinatário:</Typography>
                </Box>

                <Box mt={15}>
                    <TextField
                        value={fields.postalCode}
                        onChangeText={(text) => {
                            setFields({ ...fields, postalCode: text })
                            cepHandler(text)
                        }}

                        placeholder='CEP' />
                </Box>
                <Box>
                    <Typography fontFamily='nunitoRegular' fontSize={13}>
                        {showCepDescrption ?
                            `${fields.street} - ${fields.neighborhood}, ${fields.city} - ${fields.state}` :
                            ''
                        }
                    </Typography>
                </Box>
                <Box mt={15} flexDirection='row' justifyContent='space-between'>
                    <Box flex={1} marginRight='micro'>
                        <TextField
                            editable={false}
                            value={fields.neighborhood}
                            onChangeText={(text) => setFields({ ...fields, neighborhood: text })}
                            placeholder='Bairro' />
                    </Box>
                    <Box flex={1}>
                        <TextField
                            editable={false}
                            value={fields.state}
                            onChangeText={(text) => setFields({ ...fields, state: text })}
                            placeholder='Estado' />
                    </Box>
                </Box>
                <Box mt={15}>
                    <TextField
                        value={fields.number}
                        onChangeText={(text) => setFields({ ...fields, number: text })}
                        placeholder='Numero' />
                </Box>
                <Box mt={15}>
                    <TextField
                        value={fields.complement}
                        onChangeText={(text) => setFields({ ...fields, complement: text })}
                        placeholder='Complemento' />
                </Box>
            </Box>
        </ScrollView>

        <Button variant='primarioEstreito' onPress={saveCustomer} title='IR PARA PAGAMENTO' inline />
    </SafeAreaView >
}