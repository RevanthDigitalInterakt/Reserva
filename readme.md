# Reserva App mobile

reserva e-commerce app

## Configurações de Ambiente

Para utilizar este projeto, você precisará ter as seguintes configurações de ambiente, essas configurações servem para rodar o projeto em um agent do Azure Devops no Sistema operacional MAC OS.

* Geral: React Native Environment Setup 
* HomeBrew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" - Versão: 4.3.21
* Node.js: brew install node - Versão: v20.16.0
* Watchman: brew install watchman - Versão: 2024.08.26.00
* CocoaPods: brew install --cask cocoapods - Versão: 1.15.2
* Fastlane: brew install fastlane
* Ruby: Instalado juntamente com o Fastlane - Versão: ruby 2.6.10p210
* RubyGems: Instalado juntamente com o Fastlane - Versão: 3.0.3.1
* Xcode: Xcode on App Store  - 15.4 (15F31d)


executar app android:

```shell
yarn
yarn android
```

### Codegen

Todas as queries devem estar dentro da pasta ```./src/base/graphql/queries|mutations```
Sempre que você adicionar uma query ou mutation, é necessário executar o comando de codegen para atualizar os arquivos gerados.

#### Como atualizar os arquivos gerados

```yarn
yarn codegen
```

# Guia de Deploy no iOS

## 1. Pré-requisitos

Antes de começar, verifique se você tem:

- Um Mac com macOS instalado.
- A versão mais recente do Xcode instalada, **Versão do Xcode 15.4 (15F31d)**.
- Uma conta de desenvolvedor Apple registrada.
- **Cocoapods** instalado (ex: `pod --version 1.15.2`).
- O certificado de distribuição e o perfil de provisionamento configurados na sua conta de desenvolvedor Apple.

## 2. Configurando o Projeto

### Abrir o Projeto no Xcode

- Navegue até o diretório do projeto e abra o arquivo `.xcworkspace` no Xcode.

### Selecionar o Target

- No Xcode, na barra lateral esquerda, clique em "Project Navigator" e selecione o target do seu aplicativo (geralmente é o nome do seu projeto).

### Configurações Gerais

- No painel principal, clique na aba "General".
- Verifique se o campo "Bundle Identifier" está correto. O Bundle Identifier deve ser único e corresponder ao que está registrado no portal de desenvolvedores da Apple.
- Em "Signing & Capabilities", certifique-se de que a opção "Automatically manage signing" está marcada e selecione sua equipe de desenvolvimento (Apple Developer Team).

## 3. Configurando Certificados e Perfis de Provisionamento

### Certificados

- Vá até o portal de desenvolvedores Apple (<https://developer.apple.com>) e, em "Certificates, Identifiers & Profiles", certifique-se de que você tem um certificado de distribuição válido para iOS.

### Perfil de Provisionamento

- Ainda no portal de desenvolvedores, crie ou selecione um perfil de provisionamento que esteja associado ao seu Bundle Identifier.

## 4. Testando no Simulador

### Selecionar o Dispositivo

- Na parte superior do Xcode, ao lado do botão "Play", selecione um simulador ou dispositivo físico conectado.

### Executar o Aplicativo

- Clique no botão "Play" para compilar e rodar o aplicativo no simulador ou dispositivo. Verifique se tudo funciona como esperado.

## 5. Preparando para o Deploy

### Build Configuration

- No menu central onde mostra o projeto e a branch, ao lado do schema `Reserva`, selecione `[Any iOS Device (arm64)]`.

### Incrementar o Version e Build Number

- Primeiramente, verifique a versão atual em `Targets > reserva > Identity`, como exemplo **Version 2.26.0** e **Build 2023000200.2.26.0**.

**Obs:** Para substituir o build number (`2023000200.2.26.0`) em todos os arquivos exibidos na sua busca, você pode seguir o mesmo processo.

### Substituição de Versão nos Arquivos

Para realizar o replace da versão em todos esses arquivos de maneira eficiente, você pode seguir este tutorial usando o Visual Studio Code:

#### Abrindo a Ferramenta de Busca e Substituição no VS Code

- No Visual Studio Code, pressione `Cmd + Shift + H` (ou `Ctrl + Shift + H` no Windows/Linux) para abrir a barra de busca e substituição global.
- Na barra de busca que aparece na lateral esquerda, insira a versão atual que deseja substituir. No seu caso, seria `2.22.7`.

#### Fazendo a Substituição Global

- **Buscar por todos os arquivos:** Insira o número da versão atual (`2.22.7`) na caixa de texto de busca. Todos os arquivos onde essa versão está presente serão listados abaixo.
- **Substituir por uma nova versão:** Na caixa de texto logo abaixo da busca, insira a nova versão que você deseja usar, por exemplo, `2.26.0`.
- **Aplicar Substituições:** Se estiver tudo correto, clique no ícone de substituição (as duas setas em forma de círculo) para substituir todos os casos encontrados pela nova versão.

### Confirmando as Alterações

**Caminhos onde a versão `2.26.0` precisa ser alterada:**

- **Arquivo:** `package.json`
  - **Caminho:** `./package.json`
- **Arquivo:** `build.gradle`
  - **Caminho:** `android/app/build.gradle`
- **Arquivo:** `Info.plist`
  - **Caminho:** `ios/reserva/Info.plist`
- **Arquivo:** `project.pbxproj`
  - **Caminho:** `ios/reserva.xcodeproj/project.pbxproj`
- **Arquivo:** `Info.plist`
  - **Caminho:** `ios/reservaTests/Info.plist`

## 6. Arquivando o Projeto

### Criar o Arquivo

- No menu superior, selecione "Product" > "Archive".
- O Xcode começará a construir e arquivar o seu projeto. Quando o processo estiver concluído, a janela do "Organizer" será exibida.

### Verificar o Arquivo

- Na janela do "Organizer", verifique se o status do arquivo é "Valid". Se não for, revise os passos anteriores para corrigir os erros.

## 7. Distribuindo o Aplicativo

### Upload para a App Store Connect

- Na janela "Organizer", selecione o arquivo que você acabou de criar e clique em "Distribute App".
- Escolha "App Store Connect" como o método de distribuição e siga as instruções para fazer o upload do aplicativo.

### Preenchendo as Informações na App Store Connect

- Acesse a App Store Connect (<https://appstoreconnect.apple.com>) e preencha as informações necessárias, como descrição, capturas de tela e outros metadados.

### Enviar para Revisão

- Após preencher todos os campos necessários, clique em "Submit for Review" para enviar o aplicativo para revisão pela equipe da Apple.

## 8. Monitorando a Revisão

### Acompanhar o Status

- O processo de revisão pode levar algum tempo. Você pode acompanhar o status do seu aplicativo na App Store Connect.

### Publicação

- Se o aplicativo for aprovado, ele será publicado na App Store automaticamente na data que você especificou, ou você pode lançá-lo manualmente.

# Guia de Deploy no Android

## Pré-requisitos

Antes de começar, verifique se você tem:

- Uma conta de desenvolvedor Google Play registrada.
- Android Studio instalado com todos os SDKs necessários para compilar seu projeto.
- Um dispositivo Android físico ou emulador configurado.

## Preparando o Build

### Incrementar o Version Code e Version Name

1. Abra o arquivo `android/app/build.gradle`.
2. Localize a seção `defaultConfig` e incremente o `versionCode` e `versionName` para refletir a nova versão do seu aplicativo.

   ```groovy
   defaultConfig {
       applicationId "com.suaempresa.seuprojeto"
       minSdkVersion 21
       targetSdkVersion 30
       versionCode 2  // Incrementar
       versionName "1.1"  // Incrementar
   }

## Gerando o Bundle para Produção

### Comando para Gerar o Bundle

1. No terminal, navegue até o diretório do seu projeto React Native.
2. Execute o comando abaixo para gerar o bundle de release:

   ```shell
   cd android
   ./gradlew bundleRelease

3. Este comando irá gerar um arquivo `.aab` (Android App Bundle) na pasta `android/app/build/outputs/bundle/release/`

### Distribuindo para Teste Interno na Google Play

1. Upload para Google Play Console
2. Acesse o Google Play Console.
3. Navegue até a seção do seu aplicativo.
4. Vá para "Testes" e selecione "Teste interno".
5. Clique em "Criar novo release" e faça upload do arquivo .aab gerado.
6. Preencha as informações necessárias, como notas de versão, e clique em "Revisar".
7. Após revisar, clique em "Iniciar lançamento para teste interno".

## 9. Conclusão

Agora seu aplicativo está disponível na App Store! Lembre-se de monitorar o feedback e a performance do aplicativo, usando ferramentas como o App Store Connect e o TestFlight para distribuir novas versões e corrigir bugs.

### Screenshots

![Screenshot](https://play-lh.googleusercontent.com/Ma1OmGcoMBAjTuV6FHcM5TZ4tK3bfdvjD_ICJs5zM5YDwu8ROiKd--FhXvTljbi6HQ=w1280-h976-rw)

* **Reserva** - [usereserva.com](usereserva.com)
