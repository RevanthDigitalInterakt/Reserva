import CodePush from 'react-native-code-push';

const CodepushConfig = () => {
  CodePush.sync({
    updateDialog: {
      appendReleaseDescription: true,
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
    installMode: CodePush.InstallMode.IMMEDIATE,
  });

  /*
  CodePush.checkForUpdate().then((update) => {
    if (!update) {
      console.tron.log('The app is up to date!');
    } else {
      update
        .download((downloadProgress) => {
          console.tron.log(downloadProgress);
        })
        .then((install) => {
          console.tron.log(install);
          if (install) {
            install.install(CodePush.InstallMode.IMMEDIATE).then(
              (installResult) => {
                CodePush.notifyAppReady();
                console.tron.log(installResult);
              },
              (installError) => {
                console.tron.log(installError);
              }
            );
          }
          console.tron.log(install);
        });
      console.tron.log('An update is available! Should we download it?');
    }
  });
  */
};
export default CodepushConfig;
