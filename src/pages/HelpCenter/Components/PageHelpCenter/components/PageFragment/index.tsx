import React from 'react';
import { Text, View } from 'react-native';
import { ExpansePanel } from '../ExpansePanel';
import ImageComponent from '../ImageComponent';
import styles from './styles';
import type { ItemsSessionBodyCollectionOutput } from '../../../../../../base/graphql/generated';

interface IPageFragment {
  item: ItemsSessionBodyCollectionOutput;
}

export function PageFragment({ item }: IPageFragment) {
  return (
    <View
      key={`page-helpCenter-${item?.helpCenterSessionTitle}`}
      style={styles.containerBody}
    >
      {item?.helpCenterSessionTitle?.length && (
        <View style={styles.containerSessionTitle}>
          <Text style={styles.txtSessionTitle}>
            {item?.helpCenterSessionTitle}
          </Text>
        </View>
      )}

      {item?.helpCenterBodyText?.length && (
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

      {item?.expansePanel?.expansePanelCollection && (
        <View>
          {item?.expansePanel?.expansePanelCollection?.items?.map((expanseItem) => (
            <View
              key={`item-expanse-panel-${expanseItem?.expanseTitleItem}`}
            >
              <ExpansePanel
                expanseTitleItem={expanseItem?.expanseTitleItem}
                expanseContentItem={expanseItem?.expanseContentItem}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
