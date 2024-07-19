import React from 'react';
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import { useHelpCenterStore } from '../../../../zustand/useHelpCenterStore/useHelpCenterStore';

export default function FooterHelpCenter() {
  const { footerHelpCenter } = useHelpCenterStore(['footerHelpCenter']);

  const footerTitle = footerHelpCenter?.footerTitle;
  const textBody = footerHelpCenter?.textBody;
  const links = footerHelpCenter?.footerLinkCollection?.items;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text
          style={styles.txtFooterTitle}
        >
          {footerTitle}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textBody}>
          {textBody}
        </Text>
      </View>

      <View style={styles.container}>
        {links?.map((items) => (
          <TouchableOpacity
            key={`links-helpCenter-${items.linkTitle}`}
            onPress={() => Linking.openURL(items?.linkHelpCenter ?? '')}
          >
            <Text style={styles.txtLinkTitle}>
              {items.linkTitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
