import React from 'react';
import {
  Text,
  View,
// TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
// import IconChevronRightSmall from '../../../../../assets/icons/IconChevronRightSmall';
import CardWrapper from './components/CardWrapper';
import { useHomeStore } from '../../../../zustand/useHomeStore';

export default function CategoryComponent() {
  const { offersCarousels } = useHomeStore(['offersCarousels']);

  const title = offersCarousels.map((item) => item.categoryCards?.sectionCardTitle);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.childrenContainer}>
        <View style={styles.containerRow}>
          <Text style={styles.txtTitle}>{title}</Text>

          {/* TODO Feature for future
          <TouchableOpacity
            onPress={() => { }}
          >
            <View style={styles.containerSeeAll}>
              <Text style={styles.txtSeeAll}>Ver todas</Text>
              <View>
                <IconChevronRightSmall width={13} height={13} />
              </View>
            </View>

          </TouchableOpacity> */}
        </View>

        <CardWrapper />
      </View>
    </View>
  );
}
