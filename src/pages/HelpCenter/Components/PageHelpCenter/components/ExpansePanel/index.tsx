import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IconLegacy } from '../../../../../../components/IconLegacy/IconLegacy';
import styles from './styles';
import type { Maybe } from '../../../../../../base/graphql/generated';
import { Divider } from '../../../../../../components/Divider/Divider';

interface ExpansePanelProps {
  expanseTitleItem: Maybe<string> | undefined;
  expanseContentItem: Maybe<string> | undefined;
}

export function ExpansePanel({ expanseTitleItem, expanseContentItem }: ExpansePanelProps) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <View>
      <View key={`item-expanse-${expanseTitleItem}`} style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.btnShowDescription}
          onPress={() => setShowDescription(!showDescription)}
        >
          <>
            {showDescription
              ? (
                <View style={styles.containerIconSubtraction}>
                  <IconLegacy name="Subtraction" color="fullBlack" size={20} />
                </View>
              )
              : (
                <View style={styles.containerIconAdd}>
                  <IconLegacy name="Add" color="fullBlack" size={20} />
                </View>
              )}
            <View style={styles.expanseTitleItemContainer}>
              <Text style={styles.txtTitle}>
                {expanseTitleItem}
              </Text>
            </View>
          </>
        </TouchableOpacity>
      </View>

      {showDescription && (
        <View style={styles.expanseContentItem}>
          <View>
            <Text style={styles.txtExpanseContentItem}>
              {expanseContentItem}
            </Text>
          </View>
        </View>
      )}
      <Divider mt="xxxs" variant="fullWidth" />
    </View>
  );
}
