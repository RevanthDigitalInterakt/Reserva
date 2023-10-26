import { Platform, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Box } from '../../../../../../components/Box/Box';
import { Typography } from '../../../../../../components/Typography/Typography';
import { IconLegacy } from '../../../../../../components/IconLegacy/IconLegacy';

export type TGender = 'Homem' | 'Mulher' | 'Não binário' | 'Outro';
interface IGenderInputProps {
  currentGender: TGender | null
  handleSelectGender: (gender: TGender) => void
}

const genderTypes: Array<TGender> = ['Homem', 'Mulher', 'Não binário', 'Outro'];

function GenderInput({ currentGender, handleSelectGender }: IGenderInputProps) {
  const [isVisibleGenderPicker, setIsVisibleGenderPicker] = useState<boolean>(false);

  const handleVisibilityGenderPicker = useCallback(() => {
    setIsVisibleGenderPicker((isVisibible) => !isVisibible);
  }, []);

  const handleSelectGenderOnSelect = useCallback((gender: TGender) => {
    handleSelectGender(gender);
    setIsVisibleGenderPicker(false);
  }, []);

  return (
    <Box
      mb="xxs"
      position="relative"
      style={Platform.OS === 'ios' ? { zIndex: 1 } : {}}
    >
      <TouchableOpacity
        testID="com.usereserva:id/genderinput_button_open_gender_picker"
        onPress={handleVisibilityGenderPicker}
      >
        <Box
          backgroundColor="backgoundInput"
          alignItems="center"
          flexDirection="row"
          height={60}
          borderWidth="hairline"
          borderColor={
              !currentGender ? 'vermelhoAlerta' : 'transparente'
            }
        >
          <Box ml="xxxs">
            {!(currentGender) && (
            <Typography
              variant="descricaoCampoDePreenchimento"
              color="neutroFrio2"
              fontSize={15}
            >
              Selecione sua identidade de gênero
            </Typography>
            )}

            {!!currentGender && (
            <Box
              style={{
                marginTop: -12,
              }}
            >
              <Typography
                variant="descricaoCampoDePreenchimento"
                color="neutroFrio2"
              >
                Gênero
              </Typography>

              <Box mt="nano" pl="quarck">
                <Typography
                  fontFamily="nunitoRegular"
                  color="preto"
                  fontSize={15}
                >
                  {currentGender}
                </Typography>
              </Box>
            </Box>
            )}
          </Box>

          <Box position="absolute" right={0} top={24}>
            <IconLegacy
              color="preto"
              name="ArrowDown"
              size={18}
              marginX="micro"
            />
          </Box>
        </Box>
      </TouchableOpacity>

      {isVisibleGenderPicker && (
      <Box
        position="absolute"
        width="100%"
        top={60}
        zIndex={10000000}
      >
        {genderTypes.map((gender: TGender) => (
          <TouchableOpacity
            key={`${gender}`}
            testID="com.usereserva:id/genderinput_button_select_gender"
            onPress={() => handleSelectGenderOnSelect(gender)}
          >
            <Box
              backgroundColor="backgoundInput"
              alignItems="center"
              flexDirection="row"
              height={60}
              borderWidth="hairline"
              borderColor="transparente"
              pl="xxxs"
            >
              <Typography
                fontFamily="nunitoRegular"
                color="preto"
                fontSize={15}
              >
                {gender}
              </Typography>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
      )}

      {!(currentGender) && (
      <Typography
        fontFamily="nunitoRegular"
        fontSize="13px"
        color="vermelhoAlerta"
      >
        Preencha sua identidade de gênero
      </Typography>
      )}
    </Box>
  );
}

export default GenderInput;
