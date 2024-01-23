import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import IconComponent from '../../../../../../components/IconComponent/IconComponent';
import styles from './styles';

interface IDescription {
  description?: string | null;
}

function Description({ description }: IDescription) {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <View style={styles.mainContainer}>
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
