# Reserva App

This is an e-commerce app

## Build
[![Build status](https://app.bitrise.io/app/bc63764c79f91298.svg?token=e4-7SFrhAAp5CMevaQp30Q)](https://app.bitrise.io/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The things you'll need in order to install dependencies and run the app on android:


```shell
yarn
yarn android .
```

The things you'll need in order to install dependencies and run the app on android:

```shell
yarn
cd ios
pod install
cd ..
yarn ios
```

### Codegen
All queries must be inside the ```./src/base/graphql/queries|mutations``` folder
Whenever you add a querie or mutation, you must run the codegen command to update the generated.

#### How to update generated
```yarn
yarn codegen
```

### Screenshots

![Screenshot](https://play-lh.googleusercontent.com/Ma1OmGcoMBAjTuV6FHcM5TZ4tK3bfdvjD_ICJs5zM5YDwu8ROiKd--FhXvTljbi6HQ=w1280-h976-rw)

## Built with

* [React Native](https://reactnative.dev/) - The programming language used
* VIPER - Design Pattern
* No external libraries were used in this project

## Authors

* **Globalsys Soluções em TI** - [https://www.globalsys.com.br/](https://www.globalsys.com.br/)
* **Reserva** - [usereserva.com](usereserva.com)

## Acknowledgments

