import React from 'react';
import { FlatList, Platform } from 'react-native';
import {
  Box, Button, Typography,
} from '@usereservaapp/reserva-ui';
import { platformType } from '../../../utils/platformType';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';
import type { ConfigCollection } from '../../../graphql/homePage/HomeQuery';

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
            <ImageComponent
              borderRadius={8}
              height={154}
              width={286}
              source={{ uri: item?.image?.url }}
            />
          </Button>
        ) : null)}
        keyExtractor={(item) => item.id}
      />
    </Box>
  </>
);
