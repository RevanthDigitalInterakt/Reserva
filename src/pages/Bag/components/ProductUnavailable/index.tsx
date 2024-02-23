import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { productUnavailableStyles } from './ProductUnavailable.styles';
import IconComponent from '../../../../components/IconComponent/IconComponent';

type ProductUnavailableProps = {
  showCard: boolean
  type?: 'SOME_UNAVAILABLE' | 'UNAVAILABLE'
};

export default function ProductUnavailable({ showCard, type = 'UNAVAILABLE' }: ProductUnavailableProps) {
  const [closedCard, setClosedCard] = useState(false);

  const title = useMemo(() => {
    if (type === 'UNAVAILABLE') {
      return 'Produto indisponível no momento';
    }
    return 'Produto indisponível para retirada em loja';
  }, [type]);

  const description = useMemo(() => {
    if (type === 'UNAVAILABLE') {
      return 'No momento, este produto não esta disponível para envio ou retirada no CEP atual e será removido automaticamente na próxima etapa, mas não se preocupe, te notificaremos quando houver disponibilidade.';
    }
    return 'No momento, este produto não esta disponível para retirada, por favor, escolha outra forma de entrega na próxima etapa.';
  }, [type]);

  return (
    <View>
      {showCard && !closedCard && (
        <View style={productUnavailableStyles.container}>
          <View style={productUnavailableStyles.cardContainer}>
            <IconComponent icon="info" />
            <View style={productUnavailableStyles.textWrap}>
              <Text style={productUnavailableStyles.title}>
                {title}
              </Text>
              <Text style={productUnavailableStyles.description}>
                {description}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setClosedCard(true)}>
              <View style={productUnavailableStyles.iconContainer}>
                <IconComponent icon="closeIcon" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
