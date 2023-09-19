import React, { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useHomeStore } from "../../../../zustand/useHomeStore";
import { COLORS } from "../../../../base/styles/colors";
import type { HomeCarouselOutput } from "../../../../base/graphql/generated";
import { HomePageSectionTypeEnum } from "../../../../base/graphql/generated";
import HomeMainCarousel from "../HomeMainCarousel";
import HomeBrandsCarousel from "../HomeBrandsCarousel";
import HomeCardsCarousel from "../HomeCardsCarousel";
import testProps from "../../../../utils/testProps";
import { SearchButton } from "../../../../components/SearchButton";
import EventProvider from "../../../../utils/EventProvider";
import { usePageLoadingStore } from "../../../../zustand/usePageLoadingStore/usePageLoadingStore";
import { NewHomeCountDown } from "../NewHomeCountDown.tsx";
import styles from "./styles";
import { Box } from "../../../../components/Box/Box";

export function NewHomeCarousels() {
  const { carousels, loading } = useHomeStore(["carousels", "loading"]);
  const navigation = useNavigation();
  const { onStartLoad } = usePageLoadingStore(["onStartLoad"]);

  const handleSearchButtonPress = () => {
    EventProvider.logEvent("header_search_click", { open: 1 });
    navigation.navigate("SearchMenu");
    onStartLoad("Search");
  };

  const renderCarousel = useCallback((item: HomeCarouselOutput) => {
    if (!item.items.length) return null;

    const relationalObject: {
      [key in HomePageSectionTypeEnum | "DEFAULT"]: () => JSX.Element | null;
    } = {
      [HomePageSectionTypeEnum.Main]: () => (
        <>
          <HomeMainCarousel data={item} />
          <SearchButton
            placeholder="O que você procura hoje?"
            onPress={handleSearchButtonPress}
            style={styles.searchButton}
          />
        </>
      ),
      [HomePageSectionTypeEnum.Brands]: () => (
        <>
          <HomeBrandsCarousel data={item} />
          <NewHomeCountDown />
        </>
      ),
      [HomePageSectionTypeEnum.Cards]: () => <HomeCardsCarousel data={item} />,
      DEFAULT: () => null,
    };

    return (relationalObject[item.type] || relationalObject.DEFAULT)();
  }, []);

  if (loading) {
    return (
      <Box bg="white" marginY="nano" justifyContent="center">
        <View style={{ height: 100 }} />

        <ActivityIndicator size="small" color={COLORS.BLACK} />
      </Box>
    );
  }

  return (
    <View>
      {carousels.map((carousel) => (
        <View
          {...testProps("carousels_cards")}
          key={`item-${carousel.type}-${carousel.showtime}-${carousel.items.length}`}
        >
          {renderCarousel(carousel)}
        </View>
      ))}
    </View>
  );
}
