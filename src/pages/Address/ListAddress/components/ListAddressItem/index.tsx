import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './ListAddressItem.styles';
import IconPlace from '../../../../../../assets/icons/IconPlace';
import type { IListAddressItem } from './interface/IListAddressItem';
import IconEdit from '../../../../../../assets/icons/IconEdit';
import IconDelete from '../../../../../../assets/icons/IconDelete';

export default function ListAddressItem({
  item,
  animationListController,
  onNavigate,
}: IListAddressItem): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => animationListController(item.id)}
    >
      <View style={styles.listItemContent}>
        <View style={styles.listItemRow}>
          {!item.selected && (
            <IconPlace />
          )}

          <View style={{ marginLeft: !item.selected ? 20 : 0 }}>
            <Text style={styles.listItemTitle}>{item.addressName}</Text>
          </View>
        </View>

        {item.selected && (
          <View style={styles.listItemBody}>
            <Text style={styles.listItemSubtitle}>{item.receiverName}</Text>
            <Text style={styles.listItemSubtitle}>{`${item.street}, ${item.number}, ${item.complement}`}</Text>
            <Text style={styles.listItemSubtitle}>
              {`${item.neighborhood}, ${item.city} - ${item.state}`}
            </Text>
          </View>
        )}
      </View>
      {item.selected && (
        <View style={styles.listItemActionsContainer}>
          <TouchableOpacity style={styles.listItemActionButton} onPress={() => onNavigate(item.id)}>
            <IconEdit />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItemActionButton}>
            <IconDelete />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}
