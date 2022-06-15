import React, { useEffect, useState } from 'react';

import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { Box, Button, Image, ProgressBar, Typography } from '@danilomsou/reserva-ui';

import { images } from '../../../assets';

interface UpdateProps {
  isVisible: boolean;
  receivedBytes: number;
  totalBytes: number;
}

const Update: React.FC<UpdateProps> = ({
  isVisible,
  receivedBytes,
  totalBytes,
}) => {
  const [updateConfirmed, setUpdateConfirmed] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(40);
  const percentStep = 100;

  useEffect(() => {
    const actualPercent = (receivedBytes * 100) / totalBytes;
    setCurrentStep(actualPercent);
  }, [receivedBytes]);

  return (
    <Modal
      isVisible={isVisible}
      style={{
        margin: 0,
        backgroundColor: '#fff',
      }}
    >
      <Box bg="white" height="100%" alignItems="center" mt="40%" px="micro">
        <Box marginRight="micro">
          <Image source={images.update} resizeMode="contain" />
        </Box>

        {updateConfirmed ? (
          <>
            <Box mt="xxl">
              <Typography
                fontFamily="nunitoSemiBold"
                fontSize={13}
                textAlign="center"
              >
                Baixando...
              </Typography>
            </Box>
            <Animatable.View
              animation="fadeIn"
              style={{ width: '100%', paddingHorizontal: 60 }}
            >
              <ProgressBar
                colorBar="neutroFrio1"
                colorProgress="preto"
                value={currentStep}
                max={percentStep}
                barHeight={4}
                colorLabel="neutroFrio2"
                showPercent
              />
            </Animatable.View>
          </>
        ) : (
          <>
            {currentStep !== percentStep ? (
              <>
                <Box mt="sm" mb="xxxs">
                  <Typography fontFamily="reservaSerifMedium" fontSize={20}>
                    Hora de atualizar!
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    fontFamily="nunitoSemiBold"
                    fontSize={13}
                    textAlign="center"
                  >
                    Fizemos correções no app para tornar sua experiência a mais
                    tranquila possível.
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <Box mt="sm" mb="xxxs">
                  <Typography fontFamily="reservaSerifMedium" fontSize={20}>
                    Tudo pronto!
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    fontFamily="nunitoSemiBold"
                    fontSize={13}
                    textAlign="center"
                  >
                    Reinicie o app para poder desfrutar da nova versão.
                  </Typography>
                </Box>
              </>
            )}
          </>
        )}

        {!updateConfirmed && (
          <Box mt="md" width="100%">
            <Button
              onPress={() => setUpdateConfirmed(true)}
              inline
              title={currentStep === percentStep ? 'REINICIAR' : 'ATUALIZAR'}
              variant="primarioEstreito"
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Update;
