import React, { useState } from "react";
import { Children, Component, FC } from "react";
import { StatusBar, Platform } from 'react-native';
import LottieView from "lottie-react-native";
import { animations } from "./assets";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedLottieView from "lottie-react-native";
import { useEffect } from "react";
import { restoreSession } from "./store/ducks/authentication/actions";
import { useDispatch } from "react-redux";
import { gql, useQuery } from '@apollo/client';
import { productSearchQuery } from "./store/ducks/products/types";
import SplashScreen from "react-native-splash-screen";

const InitialScreen: React.FC<{ children: FC }> = ({ children }) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [animation, setAnimation] = useState<AnimatedLottieView | null>(null);

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    animation?.play();
  }, [animation]);

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  useEffect(() => { }, [animation?.props.progress]);

  const profileQuery = gql`
  query {
    appMenuCollection(limit: 1) {
      items {
        itemsCollection(limit: 100) {
          items {
            name
            referenceId
            childCategoryCollection(limit: 100) {
              items {
                name
                referenceId
              }
            }
          }
        }
      }
    }
  }
`;

  const { loading, error, data } = useQuery(
    profileQuery,
    {
      context: { clientName: 'contentful' }
    }
  );
  console.log(data);


  return (
    <>
      {/* {!loaded ? (
        <LottieView
          style={{ flex: 1 }}
          onAnimationFinish={() => {
            setLoaded(true);
          }}
          ref={(animation) => {
            setAnimation(animation);
          }}
          autoPlay
          loop={false}
          source={animations.splash}
        />
      ) : ( */}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <Animatable.View animation="fadeIn" style={{ height: "100%" }}>
          {children}
        </Animatable.View>
      </SafeAreaView>
      {/* // )} */}
    </>
  );
};

export default InitialScreen;
