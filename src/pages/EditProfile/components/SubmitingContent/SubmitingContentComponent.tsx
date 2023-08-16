import React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { platformType } from '../../../../utils/platformType';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';

interface ISubmitingContentComponent {
  isRegister: boolean
  handleSubmitForm: () => void
  formEditIsValid: boolean
}

function SubmitingContentComponent({
  isRegister,
  handleSubmitForm,
  formEditIsValid,
}: ISubmitingContentComponent): JSX.Element {
  const navigation = useNavigation();

  return (
    <>
      {isRegister && (
        <Box
          mb="nano"
          justifyContent="space-between"
          flexDirection="row"
          zIndex={2}
        >
          <Box paddingLeft="nano" mt="sm" width="100%">
            <Button
              testID="com.usereserva:id/submitingcontent_button_submit_register"
              title="SALVAR"
              variant="primarioEstreito"
              inline
              onPress={handleSubmitForm}
              disabled={formEditIsValid}
            />
          </Box>
        </Box>
      )}

      {!isRegister && (
        <Box
          flex={1}
          width={Dimensions.get('window').width}
          justifyContent="space-between"
          paddingX="xxxs"
          alignItems="center"
          flexDirection="row"
          height={85}
          style={{
            elevation: platformType.ANDROID === 'android' ? 10 : 0, position: 'absolute', zIndex: 999, bottom: 85 / 2, left: 0,
          }}
          backgroundColor="white"
        >
          <Box width={1 / 2.2} paddingRight="nano">
            <Button
              title="CANCELAR"
              testID="com.usereserva:id/submitingcontent_button_go_back_no_register"
              variant="primarioEstreitoOutline"
              inline
              onPress={() => navigation.goBack()}
            />
          </Box>

          <Box width={1 / 2.2} paddingLeft="nano">
            <Button
              title="SALVAR"
              variant="primarioEstreito"
              testID="com.usereserva:id/submitingcontent_button_submit_no_register"
              inline
              onPress={handleSubmitForm}
              disabled={formEditIsValid}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default SubmitingContentComponent;
