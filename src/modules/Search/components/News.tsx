import React from 'react';
import { FlatList, Platform } from 'react-native';
import { Box, Button, Typography, Image, } from 'reserva-ui';

interface INews {
    data: any;
}
export const News = ({ data }: INews) => {
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

            <Box height={160}>
                <FlatList
                    horizontal={true}
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Button
                            onPress={() => console.log(item)}
                            ml="nano"
                            mr="nano"
                            bg='white'
                            height={154}
                            width={286}
                            borderRadius="nano"
                            style={{ elevation: Platform.OS == "android" ? 4 : 0 }}
                            boxShadow={Platform.OS == "android" ? null : "bottomBarShadow"}
                        >
                            <Box >
                                <Typography>imagem 1</Typography>
                            </Box>
                        </Button>
                    )}
                    keyExtractor={item => item.id}
                />
            </Box>
        </>
    );
}