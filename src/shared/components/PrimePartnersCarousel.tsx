import React, { useRef } from 'react';
import {
    Dimensions,
    TouchableHighlight,
    Animated,
    StyleSheet,
} from 'react-native';
import { Box, Image } from '@danilomsou/reserva-ui';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface IPrimePartnersCarousel {
    prime: any;
    onPress: () => void;
}

export const PrimePartnersCarousel = ({
    prime,
    onPress
}: IPrimePartnersCarousel) => {

    const primeMokado = [
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            }
        },
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            }
        },
        {
            image: {
                url: "https://images.ctfassets.net/6jsfqc13oxv4/3G7YY0I6NzvQ3GHqbiEzLL/e8fba8065073930686ce5f11651298ac/banner-home-app-namorados.jpg"
            }
        },

    ]
    const myCards = primeMokado
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Box>
            <Box>
                <Animated.FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={myCards}
                    snapToOffsets={[...Array(myCards.length)].map(
                        (x, i) => i * (DEVICE_WIDTH * 0.85 - 48) + (i - 1) * 48
                    )}
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    contentContainerStyle={{
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                    bounces={false}
                    renderItem={({ item, index }) => (
                        <Box>
                            <Card
                                onPress={onPress}
                                image={item.image}
                                key={index}
                            />
                        </Box>
                    )}
                />

                <Box height={24} flexDirection="row" alignSelf="center">
                    <Animated.View
                        style={[
                            styles.slidingIndicatorStyle,
                            {
                                position: 'absolute',
                                transform: [
                                    {
                                        translateX: Animated.divide(
                                            scrollX,
                                            DEVICE_WIDTH * 0.88 - 48
                                        ).interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [6, 25.8],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                    {myCards.map((_item, index) => {
                        return (
                            <Box
                                key={index}
                                justifyContent="center"
                                alignItems="center"
                                width={19}
                            >
                                <Box
                                    borderWidth={1}
                                    width={7}
                                    height={7}
                                    borderRadius={16}
                                    borderColor="#6F6F6F"
                                />
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

interface ICard {
    image: string;
    onPress: () => void;
}
const Card = ({
    image,
    onPress
}: ICard) => {
    return (
        <Box>
            <TouchableHighlight
                onPress={onPress}
                style={{
                    marginLeft: 6,
                    marginRight: 6,
                }}
            >
                <Image
                    autoHeight
                    width={DEVICE_WIDTH - 91}
                    source={{ uri: image.url }}
                />
            </TouchableHighlight>
        </Box>
    );
};

const styles = StyleSheet.create({
    slidingIndicatorStyle: {
        backgroundColor: '#6F6F6F',
        width: 7,
        height: 7,
        alignSelf: 'center',
        zIndex: 2,
        borderRadius: 16,
    },
});