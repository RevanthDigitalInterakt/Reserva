import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import styles from './styles';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import FooterHelpCenter from '../FooterHelpCenter';
import { ExpansePanel } from './components/ExpansePanel';
import { Divider } from '../../../../components/Divider/Divider';
import ImageComponent from './components/ImageComponent';
import ClothingCareFragment from '../../pages/ClothingCare';

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
                <View
                  key={`page-helpCenter-${item?.helpCenterSessionTitle}`}
                >
                  {item?.helpCenterSessionTitle && (
                    <View style={styles.containerSessionTitle}>
                      <Text style={styles.txtSessionTitle}>
                        {item?.helpCenterSessionTitle}
                      </Text>
                    </View>
                  )}

                  {item?.helpCenterBodyText && (
                    <View style={styles.containerBodyText}>
                      <Text style={styles.txtBodyText}>
                        {item?.helpCenterBodyText}
                      </Text>
                    </View>
                  )}

                  {item?.bodyImagesCollection && (
                    <ImageComponent
                      data={item?.bodyImagesCollection}
                    />
                  )}

                  {item?.expansePanel?.expansePanelCollection?.items?.length && (
                    <View>
                      {item?.expansePanel?.expansePanelCollection?.items?.map((expanseItem) => (
                        <View>
                          <ExpansePanel
                            expanseTitleItem={expanseItem?.expanseTitleItem}
                            expanseContentItem={expanseItem?.expanseContentItem}
                          />
                          <Divider mt="xxxs" variant="fullWidth" />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
          {isClothingCarePage && (<ClothingCareFragment />)}

        </View>
        <FooterHelpCenter />
      </ScrollView>
    </SafeAreaView>
  );
}
