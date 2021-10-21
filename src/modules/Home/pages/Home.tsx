import { useLazyQuery, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Box, Image, Typography, Button, Icon } from 'reserva-ui';
import { useAuth } from '../../../context/AuthContext';
import { homeQuery, HomeQuery } from '../../../graphql/homePage/HomeQuery';
import { profileQuery } from '../../../store/ducks/profile/types';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { View } from 'react-native-animatable';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { DiscoutCodeModal } from '../component/DiscoutCodeModal';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const HomeScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const { cookie, setEmail } = useAuth()
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true)
  const [isVisibleUpdateStore, setIsVisibleUpdateStore] = useState(false)
  const [getProfile, { data: profileData, loading: profileLoading }] = useLazyQuery(profileQuery);
  const [images, setImages] = React.useState<HomeQuery[]>([])
  const [hasInternet, setHasInternet] = React.useState<boolean>(false)
  const deviceWidth = Dimensions.get('screen').width;
  const { loading, error, data, refetch } = useQuery(
    homeQuery,
    {
      context: { clientName: 'contentful' },
      variables: { limit: 0 } // quantidade de itens que iram renderizar
    }
  );
  const { WithoutInternet } = useCheckConnection({ refetch: refetch })

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
      AsyncStorage.setItem('@RNAuth:email', profileData?.profile?.email)
    }
  }, [profileData])


  return (
    <Box flex={1} bg='white'>
      <TopBarDefault loading={loading} />
      {/* <Box
        minHeight={40}
        bg="verdeSucesso"
        paddingLeft="xxxs"
        py="micro"
        flexDirection="row"
        alignItems="center"
        paddingRight="xxxs"
        boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
        style={{ elevation: 10 }}
      >
        <Box flex={1}>
          <Typography
            fontFamily="reservaSansRegular"
            fontSize={13}
            color="white"
          >
            Aproveite o desconto de R$ 50 em sua primeira compra no app.
          </Typography>
        </Box>
        <Button
          flex={1}
        // onPress={() => ('')}
        >
          <Icon name='Close' size={15} color='white' ml="xxxs" />
        </Button>
      </Box> */}
      <StoreUpdate />
      <DiscoutCodeModal isVisible={modalCodeIsVisible} code={'RSVAPP50'} onClose={() => { setModalCodeIsVisible(false) }} />
      <WithoutInternet />
      {
        loading ?
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
                <Box mb="quarck" width={1 / 1} >
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
                      height={item.height}
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
