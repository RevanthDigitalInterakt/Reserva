import { useLazyQuery, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Box, Image } from 'reserva-ui';
import { useAuth } from '../../../context/AuthContext';
import { homeQuery, HomeQuery } from '../../../store/ducks/HomePage/types';
import { load } from '../../../store/ducks/nearbyStores/actions';
import { profileQuery } from '../../../store/ducks/profile/types';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { View } from 'react-native-animatable';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const HomeScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const { cookie, setEmail } = useAuth()
  const [getProfile, { data: profileData, loading: profileLoading }] = useLazyQuery(profileQuery);

  const dispatch = useDispatch();
  const [images, setImages] = React.useState<HomeQuery[]>([])
  const deviceWidth = Dimensions.get('screen').width;
  const { loading, error, data, } = useQuery(
    homeQuery,
    {
      context: { clientName: 'contentful' },
      variables: { limit: 0 } // quantidade de itens que iram renderizar
    }
  );


  useEffect(() => {
    let arrayImages = data?.homePageCollection.items[0].mediasCollection.items.map((imageDescription: any) => {
      return {
        fileName: imageDescription.image.fileName,
        title: imageDescription.image.title,
        width: imageDescription.image.width,
        height: imageDescription.image.height,
        size: imageDescription.image.size,
        url: imageDescription.image.url,
        reference: imageDescription.reference,
      }
    })
    setImages(arrayImages)
  }, [data]);

  useLayoutEffect(() => {
    if (cookie !== null) {
      getProfile()
    }
  }, [])

  useEffect(() => {
    if (profileData) {
      setEmail(profileData?.profile?.email);
    }
  }, [profileData])


  useEffect(() => {
    dispatch(load({ UF: 'RJ' }));
  }, []);

  return (
    <Box flex={1}>
      <TopBarDefault loading={loading} />

      {loading ?
        <></>
        // <Box flex={1}>
        //   <SkeletonPlaceholder>
        //     <SkeletonPlaceholder.Item width={screenWidth} height={screenHeight}>
        //     </SkeletonPlaceholder.Item>
        //   </SkeletonPlaceholder>
        // </Box>
        :
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <Box alignItems="flex-start">
              <Box mb="quarck" width={1 / 1}>
                <TouchableHighlight
                  onPress={() => {
                    let facetInput = []
                    const [categoryType, categoryData] = item.reference.split(':')
                    if (categoryType === 'category') {

                      categoryData.split('|').forEach((cat: string) => {
                        facetInput.push({
                          key: 'c',
                          value: cat
                        })
                      })
                    } else {
                      facetInput.push({
                        key: 'productClusterIds',
                        value: categoryData
                      })
                    }
                    navigation.navigate('ProductCatalog', { facetInput, referenceId: item.reference });
                  }}
                >
                  <Image
                    autoHeight={true}
                    width={deviceWidth}
                    source={{ uri: item.url }}
                  />
                </TouchableHighlight>
              </Box>
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      }

    </Box>
  );
};
