import {
  FlatList, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import type { GiftCardListProps, GiftCardOptionProps } from './types';
import styles from './styles';

function GiftCardOption({ onSelect, option }: GiftCardOptionProps) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(option)}
      style={styles.cardOption}
    >
      <Text style={styles.cardOptionText}>
        {option.name}
      </Text>
    </TouchableOpacity>
  );
}

export function GiftCardList({ list, onSelect }: GiftCardListProps) {
  return (
    <View>
      <Text style={styles.title}>
        Escolha o Valor do Cartão
      </Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={list}
        renderItem={
          ({ item }) => <GiftCardOption onSelect={onSelect} option={item} key={item.itemId} />
        }
        keyExtractor={(item) => item.itemId}
      />
    </View>
  );
}
