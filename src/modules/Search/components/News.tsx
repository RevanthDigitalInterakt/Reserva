import React from 'react';
import { FlatList, Platform } from 'react-native';
import {
  Box, Button, Typography, Image,
} from '@usereservaapp/reserva-ui';
import { ConfigCollection } from 'graphql/homePage/HomeQuery';
import { platformType } from '../../../utils/platformType';

interface INews {
  data: ConfigCollection[];
  onPress: (value: ConfigCollection) => void;
}

export const News = ({ data, onPress }: INews) => (
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
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (item?.image?.url ? (
          <Button
            onPress={() => onPress(item)}
            ml="nano"
            mr="nano"
            width={286}
            height={154}
            borderRadius="nano"
            style={{ elevation: Platform.OS === platformType.ANDROID ? 4 : 0 }}
            boxShadow={Platform.OS === platformType.ANDROID ? null : 'topBarShadow'}
          >
            <Image
              borderRadius={8}
              autoHeight
              height={154}
              width={286}
              source={{ uri: item.image.url }}
            />
          </Button>
        ) : null)}
        keyExtractor={(item) => item.id}
      />
    </Box>
  </>
);
