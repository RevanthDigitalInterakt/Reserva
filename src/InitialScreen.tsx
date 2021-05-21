import React, { useState } from "react";
import { Children, Component, FC } from "react";
import LottieView from "lottie-react-native";
import { animations } from "./assets";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedLottieView from "lottie-react-native";
import { useEffect } from "react";

const InitialScreen: React.FC<{ children: FC }> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [animation, setAnimation] = useState<AnimatedLottieView | null>(null);

  useEffect(() => {
    animation?.play();
  }, [animation]);

  useEffect(() => {}, [animation?.props.progress]);

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
