import React, { useState } from "react";
import { Children, Component, FC } from "react";
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

const InitialScreen: React.FC<{ children: FC }> = ({ children }) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [animation, setAnimation] = useState<AnimatedLottieView | null>(null);

  useEffect(() => {
    animation?.play();
  }, [animation]);

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  useEffect(() => {}, [animation?.props.progress]);

  const { loading, error, data } = useQuery(
    productSearchQuery, 
    { 
      variables: {
        query: "clothing"
      }
    }
  );
  console.log(data);

  return (
    <>
      {!loaded ? (
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
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <Animatable.View animation="fadeIn" style={{ height: "100%" }}>
            {children}
          </Animatable.View>
        </SafeAreaView>
      )}
    </>
  );
};

export default InitialScreen;
