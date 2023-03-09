import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { BackHandler, Platform } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import codePush, { DownloadProgress } from 'react-native-code-push';
import ReactNativeModal from 'react-native-modal';
import { animations } from '../../assets';
import { platformType } from '../../utils/platformType';

interface CodePushContext {
  status: null | codePush.SyncStatus;
  progress: null | number;
  showModal: boolean;
  immediateUpdate: boolean;
}

class CodePushComponent extends React.Component<{}, CodePushContext> {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      showModal: false,
      status: null,
      immediateUpdate: false,
    };
  }

  codePushStatusDidChange(status: codePush.SyncStatus) {
    this.setState({ status });
  }

  syncImmediate() {
    codePush.checkForUpdate()
      .then((update) => {
        if (!update) {
          this.setState({
            showModal: false,
          });
        } else {
          this.setState({
            showModal: true,
          });
        }
      });
  }

  componentDidMount() {
    this.syncImmediate();
  }

  _immediateUpdate() {
    this.setState({ immediateUpdate: true, showModal: false }, () => {
      codePush.sync(
        { installMode: codePush.InstallMode.IMMEDIATE },
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this),
      );
    });
  }

  codePushDownloadDidProgress(progress: DownloadProgress) {
    if (this.state.immediateUpdate) {
      this.setState({
        progress: ((progress.receivedBytes / progress.totalBytes) * 100),
      });
    }
  }

  render() {
    return (
      <>
        {
          this.state.showModal
          && (
          <ReactNativeModal
            isVisible
            backdropOpacity={0.5}
            animationIn="fadeIn"
            animationOut="fadeIn"
          >
            <Box
              bg="white"
              minHeight={175}
              marginX={8}
              borderRadius={4}
              paddingX={22}
              paddingY={20}
            >
              <Box mb={8}>
                <Typography fontSize={6} fontFamily="reservaSerifBold">Hora de atualizar</Typography>
              </Box>

              <Box>
                <Typography fontSize={5} fontFamily="reservaSerifRegular">
                  Está disponível uma nova versão do App, realizamos melhorias para tornar sua experiência a mais tranquila possível.
                </Typography>
              </Box>

              <Box flexDirection="row" alignSelf="flex-end" mt={8}>
                <Button
                  onPress={() => this._immediateUpdate()}
                  title="ATUALIZAR"
                  fontFamily="reservaSerifBold"
                  marginRight={20}
                />
                <Button onPress={() => { Platform.OS === platformType.ANDROID ? BackHandler.exitApp() : RNExitApp.exitApp(); }} title="SAIR" fontFamily="reservaSerifBold" />
              </Box>
            </Box>
          </ReactNativeModal>
          )
        }
        {this.state.progress > 0 && this.state.progress < 100
          ? (
            <ReactNativeModal
              isVisible
              backdropOpacity={0.5}
              backdropColor="white"
              animationInTiming={300}
              animationIn="fadeIn"
              animationOut="fadeIn"
              testID="com.usereserva:id/LottieLoader"
            >
              <Box
                style={{ flex: 1, marginHorizontal: 107 }}
              >
                <AnimatedLottieView
                  onAnimationFinish={() => { }}
                  autoPlay={this.state.progress > 0 && this.state.progress < 100}
                  loop
                  source={animations.loader}
                />
              </Box>
            </ReactNativeModal>
          )
          : <></>}
      </>
    );
  }
}
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

const CodePushModal = codePush(codePushOptions)(CodePushComponent);
export default CodePushModal;
