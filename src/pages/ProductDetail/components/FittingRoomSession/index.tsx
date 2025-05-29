import React from 'react';
import { View } from 'react-native';

import SizeGuide from './components/SizeGuide';
import FooterDoris from './components/FooterDoris';
import { Divider } from '../../../../components/Divider/Divider';
import styles from './styles';
import ButtonDoris from './components/ButtonDoris';
import testProps from '../../../../utils/testProps';
import { ModalBag } from '../../../../components/ModalBag/ModalBag';
import useDorisStore from '../../../../zustand/useDorisStore';

interface IFittingRoomSession {
  categoryTree?: { name: string }[] | null;
  productId?: string;
  productEan?: string;
  isValidProductDoris: boolean;
}

export default function FittingRoomSession({
  categoryTree,
  productId,
  productEan,
  isValidProductDoris,
}: IFittingRoomSession) {
  const { showAnimationBagDoris, setShowAnimationBagDoris } = useDorisStore(['showAnimationBagDoris', 'setShowAnimationBagDoris']);
  return (
    <View {...testProps('fitting_room_session')}>
      {isValidProductDoris && !!categoryTree?.length && (
        <Divider variant="fullWidth" my="xs" />
      )}
      <View style={styles.childContainer}>
        {isValidProductDoris && (
          <>
            <ModalBag
              isVisible={showAnimationBagDoris}
              onBackdropPress={() => setShowAnimationBagDoris(false)}
            />
            <ButtonDoris
              enabledBtnFullDoris={!categoryTree?.length}
              productEan={productEan}
              productId={productId}
            />
          </>
        )}

        {!!categoryTree?.length && (
          <SizeGuide
            categoryTree={categoryTree}
            productId={productId}
            enabledBtnFullSizeGuide={!isValidProductDoris}
          />
        )}
      </View>

      {isValidProductDoris && (
        <FooterDoris enabledBtnFullDoris={!!categoryTree?.length} />
      )}

      <Divider variant="fullWidth" my="xs" />
    </View>
  );
}
