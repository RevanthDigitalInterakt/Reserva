import React, { useEffect, useState } from 'react';
import { Box, Button, Picker, TextField, Typography } from 'reserva-ui';
import { Product } from '../../../../store/ducks/product/types';
interface CreateCategoryModalProps {
  isVisible: boolean;
  favoritedProduct?: Product;
}

export const CreateCategoryModal = ({
  isVisible,
  favoritedProduct,
}: CreateCategoryModalProps) => {
  const [textInput, setTextInput] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [pickerIsVisible, setPickerIsVisible] = useState(true);
  const createCategoryText = 'criar categoria';

  useEffect(() => {
    if (isVisible) {
      setPickerIsVisible(true);
      setModalIsVisible(false);
    }
  }, [favoritedProduct]);

  return isVisible ? (
    <>
      {modalIsVisible && (
        <Box
          position='absolute'
          backgroundColor='transparente'
          justifyContent='center'
          alignItems='center'
          height={'100%'}
          width={'100%'}
          style={{ elevation: 4, zIndex: 4 }}
        >
          <Box
            height={'100%'}
            width={'100%'}
            style={{ backgroundColor: '#000', opacity: 0.6 }}
          >
            <Button
              height={'100%'}
              width={'100%'}
              onPress={() => {
                setModalIsVisible(false);
              }}
            />
          </Box>
          <Box
            px='micro'
            py='xxs'
            height={170}
            width={300}
            position='absolute'
            backgroundColor='white'
            justifyContent='space-between'
          >
            <TextField
              placeholder='nome da categoria'
              onChangeText={(value) => {
                setTextInput(value);
              }}
            />
            <Button
              title='criar categoria'
              variant='primarioEstreitoOutline'
              onPress={() => {
                favoritedProduct &&
                  setModalIsVisible(false);
              }}
            />
          </Box>
        </Box>
      )}
      {/* <Picker
        title='selecionar categoria'
        isVisible={pickerIsVisible}
        items={[
          ...wishlist
            .filter(
              (val, idx, self) =>
                self.findIndex((x) => x.category == val.category) === idx
            )
            .map((x) => ({ text: x.category })),
          { text: createCategoryText },
        ]}
        onAndroidBackButtonPress={() => {
          setPickerIsVisible(false);
        }}
        onClose={() => {
          setPickerIsVisible(false);
        }}
        onSelect={({ text }) => {
          if (text == createCategoryText) {
            setModalIsVisible(true);
          } else {
            favoritedProduct &&
              dispatch(appendWishlist({ category: text, ...favoritedProduct }));
            setPickerIsVisible(false);
          }
        }}
      /> */}
    </>
  ) : null;
};
