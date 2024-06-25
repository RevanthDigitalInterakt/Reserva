import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import FooterHelpCenter from '../FooterHelpCenter';
import ClothingCareFragment from '../../pages/ClothingCare';
import styles from './styles';
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import { PageFragment } from './components/PageFragment';
import type { RootStackParamList } from '../../../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'PageHelpCenter'>;

export default function PageHelpCenter({ route }: Props) {
  const { data, title } = route.params;
  const isClothingCarePage = useMemo(() => title === 'Cuidados com a roupa', [title]);

  if (!data) return null;

  return (
    <SafeAreaView
      style={styles.safeContainer}
    >
      <TopBarBackButton />
      <ScrollView>
        <View style={styles.mainContainer}>

          <View style={styles.containerTitle}>
            <View style={styles.containerTxtTitle}>
              <Text style={styles.txtTitle}>
                {title}
              </Text>
            </View>
          </View>

          {data && (
            <View style={styles.containerBody}>
              {data?.map((item) => (
                <PageFragment
                  key={`item-page-fragment${item?.helpCenterSessionTitle}`}
                  item={item}
                />
              ))}
              {isClothingCarePage && (<ClothingCareFragment />)}
            </View>
          )}

        </View>
        <FooterHelpCenter />
      </ScrollView>
    </SafeAreaView>
  );
}
