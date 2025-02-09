import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

function ListEmpty() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>
          Você ainda não tem pedidos realizados :(
        </Text>
      </View>
      <View style={styles.containerSubTitle}>
        <Text style={styles.subTitle}>
          Navegue pelo nosso app e compre os produtos que são a sua cara!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btnTitle}>
          navegar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ListEmpty;
