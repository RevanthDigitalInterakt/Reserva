import React from 'react';
import { FlatList, Platform, Dimensions } from 'react-native';
import { Box, Button, Typography, Image, } from 'reserva-ui';

interface INews {
    data: {
        reference: string;
        image: {
            url: string;
        };
    }[];
    onPress: (value: string) => void;
}

export const News = ({ data, onPress }: INews) => {
    return (
        <>
            <Box mt="sm" marginX="nano" mb="micro">
                <Typography
                    fontFamily="nunitoBold"
                    fontSize={13}
                    color="neutroFrio2"
                >
                    NOVIDADES
                </Typography>
            </Box>

            <Box height={170} pt="quarck">
                <FlatList
                    horizontal={true}
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Button
                            onPress={() => onPress(item.reference)}
                            ml="nano"
                            mr="nano"
                            width={286}
                            height={154}
                            borderRadius="nano"
                            style={{ elevation: Platform.OS == "android" ? 4 : 0 }}
                            boxShadow={Platform.OS == "android" ? null : "topBarShadow"}
                        >
                            <Image
                                borderRadius={8}
                                autoHeight={true}
                                height={154}
                                width={286}
                                source={{ uri: item.image.url }}
                            />
                        </Button>
                    )}
                    keyExtractor={item => item.id}
                />
            </Box>
        </>
    );
}