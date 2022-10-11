import { Box } from '@danilomsou/reserva-ui'
import AnimatedLottieView from 'lottie-react-native'
import React, { createContext, useContext } from 'react'
import { Text, View } from 'react-native'
import codePush, { DownloadProgress } from 'react-native-code-push'
import ReactNativeModal from 'react-native-modal'
import { animations } from "../../assets";

interface CodePushContext {
  status: null | codePush.SyncStatus
  progress: null | number
}

class CodePushComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: 0
    }
  }
  teste() {
    codePush({
      updateDialog: {
        appendReleaseDescription: false,
        descriptionPrefix: '\n\n',
        mandatoryContinueButtonLabel: 'Atualizar',
        optionalIgnoreButtonLabel: 'Continuar',
        mandatoryUpdateMessage:
          'Está disponível uma nova versão do App, realizamos melhorias para tornar sua experiência a mais tranquila possível.',
        optionalInstallButtonLabel: 'Atualizar',
        optionalUpdateMessage:
          'Está disponível uma nova versão do App, realizamos melhorias para tornar sua experiência a mais tranquila possível.',
        title: 'Hora de atualizar',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    })
  }

  componentDidMount() {
    this.teste();
  }

  codePushDownloadDidProgress(progress) {
    console.log('progress::>', progress);
    // let msg = ((progress.receivedBytes / progress.totalBytes) * 100);
    // console.log(msg);
    this.setState({
      progress: ((progress.receivedBytes / progress.totalBytes) * 100)
    });
  }

  render() {
    return (
      <>
        {this.state.progress > 0 && this.state.progress < 100 ?
          <ReactNativeModal
            isVisible={true}
            backdropOpacity={0.5}
            backdropColor={'white'}
            animationInTiming={300}
            animationIn="fadeIn"
            animationOut="fadeIn"
            testID="LottieLoader"
          >
            <Box
              // style={{
              //   marginHorizontal: 50
              // }}
              style={{ flex: 1, marginHorizontal: 107 }}
            >
              <AnimatedLottieView
                style={{ flex: 1 }}
                onAnimationFinish={() => { }}
                // onAnimationFinish={() => {
                //   setShowLottieConfirmation(true);
                //   paymentType === 'Credit' ?
                //     navigation.navigate('PurchaseConfirmationScreen', { paymentType: 'Credit', orderGroupId: orderGroupId })
                //     :
                //     navigation.navigate('PurchaseConfirmationScreen', {
                //       paymentType: route.params.paymentType,
                //     });
                // }}
                // ref={lottieLoaderRef}
                loop={true}
                source={animations.confirmation}
              />
            </Box>
          </ReactNativeModal>
          : <></>}
      </>
    );
  }
}
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    appendReleaseDescription: false,
    title: 'Hora de atualizar',
    mandatoryUpdateMessage:
      'Está disponível uma nova versão do App, realizamos melhorias para tornar sua experiência a mais tranquila possível.',
    mandatoryContinueButtonLabel: 'Atualizar',
    optionalUpdateMessage:
      'Está disponível uma nova versão do App, realizamos melhorias para tornar sua experiência a mais tranquila possível.',
    optionalInstallButtonLabel: 'Atualizar',
    optionalIgnoreButtonLabel: 'Continuar',
  },
  installMode: codePush.InstallMode.IMMEDIATE,
};

const CodePushModal = codePush(codePushOptions)(CodePushComponent)
export default CodePushModal 