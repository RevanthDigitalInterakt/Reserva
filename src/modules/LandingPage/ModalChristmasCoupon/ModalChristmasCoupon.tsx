import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import useMasterdataProvider from "../../../hooks/useMasterdataProvider";
import ModalChristmasCouponForm from "./ModalChristmasCouponForm";
import useAsyncStorageProvider from "../../../hooks/useAsyncStorageProvider";
import { IResponseCouponShowModal } from "../../../types/interfaces/IResponseCouponShowModal";

export interface IModalChristmasCoupon {
  isVisible: boolean;
  orderId: string;
  onClose: () => void;
}

function ModalChristmasCoupon({ isVisible, orderId, onClose }: IModalChristmasCoupon) {
  const { setItem } = useAsyncStorageProvider();
  const { onCheckChristmasModalVisibility } = useMasterdataProvider();

  const [modalInfo, setModalInfo] = useState<IResponseCouponShowModal>({
    showModal: false,
    title: '',
    subtitle: [],
    fineline: '',
    titleButton: '',
  });

  const modalIsVisible = useMemo(() => !!(
    modalInfo?.showModal && isVisible
  ), [modalInfo, isVisible])

  const onCloseModal = useCallback(() => {
    setItem('@RNOrder:ChristmasCouponModalOrderId', '');
    onClose();
  }, [onClose]);

  useEffect(() => {
    onCheckChristmasModalVisibility().then(setModalInfo)
  }, [])

  useEffect(() => {
    if (modalIsVisible && orderId) {
      setItem('@RNOrder:ChristmasCouponModalOrderId', orderId);
    }
  }, [modalIsVisible, orderId])

  return (
    <Modal
      avoidKeyboard
      onBackdropPress={onCloseModal}
      isVisible={modalIsVisible}
      testID="modalchristmas_container"
    >
      {!!modalInfo?.showModal && (
        <ModalChristmasCouponForm
          title={modalInfo.title}
          subtitle={modalInfo.subtitle}
          fineline={modalInfo.fineline}
          buttonTitle={modalInfo.titleButton}
          onClose={onCloseModal}
          orderId={orderId}
        />
      )}
    </Modal>
  );
}

export default ModalChristmasCoupon;
