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
};
export default CodepushConfig;
