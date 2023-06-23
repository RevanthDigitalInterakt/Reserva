
# Instalação

```bash
npm install appium@2.0.0-beta.57 -g

# verifique se já tem instalado appium driver list --installed
appium driver install uiautomator2
appium driver install xcuitest
yarn
```

## Rodando

```bash
yarn android / yarn ios
```

Antes de executar os testes automatizados,
primeiro o app precisa estar executando (Android ou iOS)
e o metro precisa esta rodando

```bash
yarn start:appium
yarn test:e2e:android
yarn test:e2e:ios
```

## Para rodas ambos Android e iOS

```bash
test:e2e:all
```

# Sobre a Configuração

Antes de rodar verifique no arquivo `e2e-config.js` configure seu emulador do android e o simulador do iOS

## Como funciona o E2E?

Através do comando test:e2e:android, iniciamos os testes que iniciam o script basicE2E.test.js. Este arquivo é obtido através do script auxiliar e2e-config.js, que informa qual plataforma testar (passada como uma variável de ambiente, E2E_DEVICE, durante o comando yarn, verifique test:e2e:android no package.json). Em seguida, o arquivo acessa a seção e2e do package.json e utiliza essas informações no beforeAll para iniciar o cliente webdriverIO.

Para invocar os componentes nativos: client.$('~<string>') (o ~ é intencional e importante!). O <string> aqui é o que configuramos em App.js e deve ser apenas a opção accessibilityID (que o RN retorna para o componente nativo)

Para adaptar esse uso para iOS/Android e para o componente Text, usamos o helper testProps (<http://93days.me/testing-react-native-application/>)
Dessa forma, podemos interagir com todos os elementos na tela que têm sua string configurada como props através de {...testProps(<string>)}.
npm install appium@1.22.3 -g
```

TODO explicar a estrutura de pasta do regression-app, 
TODO explicar como funciona o E2E no projeto (codecept, etc)
TODO como mapear os ID com o testProps
