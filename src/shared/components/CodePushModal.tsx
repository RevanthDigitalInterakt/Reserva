import { Box, Typography } from '@danilomsou/reserva-ui'
import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
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
      progress: 0,
      showModal: false,
    }
  }

  teste() {
    codePush.checkForUpdate()
      .then((update) => {
        console.log('update', update)
        if (!update) {
          console.log("The app is up to date!");
          this.setState({
            showModal: false
          });
        } else {
          console.log("vamos atualizar");
          this.setState({
            showModal: true
          });
        }
      });
  }

  componentDidMount() {
    this.teste();
  }

  codePushDownloadDidProgress(progress) {
    this.setState({
      progress: ((progress.receivedBytes / progress.totalBytes) * 100)
    });
  }

  render() {
    return (
      <>
        {
          this.state.showModal &&
          <ReactNativeModal
            isVisible={true}
            backdropOpacity={0.5}
            // backdropColor={'white'}
            // animationInTiming={300}
            animationIn="fadeIn"
            animationOut="fadeIn"
          >
            <Box
              // flex={1}
              // bg='amareloAtencao'
              height={175}
              marginX={8}
              borderRadius={4}
              paddingX={22}
            >
              <Box>
                <Typography>Hora de atualizar</Typography>
              </Box>
            </Box>
          </ReactNativeModal>
        }
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
              style={{ flex: 1, marginHorizontal: 107 }}
            >
              <AnimatedLottieView
                onAnimationFinish={() => { }}
                autoPlay={this.state.progress > 0 && this.state.progress < 100}
                loop={true}
                source={animations.loader}
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