import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, TextField, Typography } from "reserva-ui"
import { RootStackParamList } from "../../../routes/StackNavigator"
import { TopBarDefault } from "../../Menu/components/TopBarDefault"
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton"

interface CreateCartProfileProfile extends StackScreenProps<RootStackParamList, 'CreateCartProfile'> {

}

export const CreateCartProfile: React.FC<CreateCartProfileProfile> = ({ navigation, route }) => {
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        brigthDate: '',
        cpf: '',
        tel: '',
        cep: '',
        district: '',
        state: '',
        number: '',
        complement: ''
    })
    return <SafeAreaView backgroundColor='white' flex={1}>
        <TopBarDefaultBackButton loading={false} />
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
                        value={fields.brigthDate}
                        onChangeText={(text) => setFields({ ...fields, brigthDate: text })}
                        placeholder='Data de Nascimento' />
                </Box>
                <Box mt={15}>
                    <TextField
                        value={fields.brigthDate}
                        onChangeText={(text) => setFields({ ...fields, brigthDate: text })}
                        placeholder='Cpf' />
                </Box>
                <Box mt={15}>
                    <TextField
                        value={fields.tel}
                        onChangeText={(text) => setFields({ ...fields, tel: text })}
                        placeholder='Telefone' />
                </Box>

                <Box mt={20}>
                    <Typography>Insira o endereço do destinatário:</Typography>
                </Box>

                <Box mt={15}>
                    <TextField
                        value={fields.cep}
                        onChangeText={(text) => setFields({ ...fields, cep: text })}
                        placeholder='CEP' />
                </Box>
                <Box mt={15} flexDirection='row' justifyContent='space-between'>
                    <Box flex={1} marginRight='micro'>
                        <TextField
                            value={fields.district}
                            onChangeText={(text) => setFields({ ...fields, district: text })}
                            placeholder='Bairro' />
                    </Box>
                    <Box flex={1}>
                        <TextField
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

        <Button variant='primarioEstreito' title='IR PARA PAGAMENTO' inline />
    </SafeAreaView >
}