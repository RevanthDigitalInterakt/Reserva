import React, { useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import images from '../../base/styles/icons';
import styles from './styles';
import { commons } from '../../base/styles';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarDefaultBackButton } from '../../modules/Menu/components/TopBarDefaultBackButton';
import { ModalNewsletter } from './components/ModalNewsletter/ModalNewsletter';
import { FormNewsletter } from './components/FormNewsletter/FormNewsletter';

type INewsletterProps = StackScreenProps<RootStackParamList, 'Newsletter'>;

export default function Newsletter({ navigation, route }: INewsletterProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const headerImageUrl = route.params?.headerImageUrl;

  const onBackdropPress = useCallback(() => {
    setOpenModal(false);

    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={styles.containerPage}>
      <TopBarDefaultBackButton
        navigateGoBack
        loading={false}
      />
      <ModalNewsletter isVisible={openModal} onBackdropPress={onBackdropPress} />
      <ScrollView>
        <View style={styles.containerMain}>
          <View>
            <Image
              style={styles.imageHeader}
              source={headerImageUrl ? { uri: headerImageUrl } : images.newsletter}
              resizeMode="cover"
            />
          </View>
          <View style={styles.containerBody}>
            <View style={styles.containerTxtTitle}>
              <Text style={styles.txtTitle}>
                Fique por dentro das novidades!
              </Text>
            </View>
            <View style={styles.containerTxtSubTitle}>
              <Text style={styles.txtSubTitle}>
                Inscreva-se na nossa newsletter para não perder as novidades e promoções.
              </Text>
            </View>

            <FormNewsletter setOpenModal={setOpenModal} />
          </View>

          <View style={styles.umP5PWrapper}>
            <Image source={commons.umPCincoPLogo} alt="1p5p" />
            <View style={styles.divider} />
            <Text style={styles.umP5PText}>
              A cada peça vendida 5 pratos são complementados através da ONG Mesa Brasil.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
