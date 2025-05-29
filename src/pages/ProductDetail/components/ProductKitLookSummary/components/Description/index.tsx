import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import IconComponent from '../../../../../../components/IconComponent/IconComponent';
import styles from './styles';
import { useProductDetailStore } from '../../../../../../zustand/useProductDetail/useProductDetail';

function Description() {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const description = productDetail?.properties?.description;
  const [expand, setExpand] = useState<boolean>(false);

  if (!description) return null;

  return (
    <View style={styles.mainContainer}>

      <View style={styles.divider} />
      <TouchableOpacity
        onPress={() => {
          setExpand(!expand);
        }}
      >
        <View style={styles.containerIcon}>
          <IconComponent
            icon={expand ? 'subtraction' : 'addition'}
            width={32}
            height={32}
          />
          <Text style={styles.textAbout}>Sobre este produto</Text>
        </View>
      </TouchableOpacity>

      {expand && (
        <Text style={styles.textDescription}>{description}</Text>
      )}
    </View>
  );
}

export default Description;
