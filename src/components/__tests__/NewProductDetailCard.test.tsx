import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { useIsTester } from '../../hooks/useIsTester';
import { NewProductDetailCard } from '../NewProductDetailCard';

jest.mock('../../hooks/useRemoteConfig', () => ({
  useRemoteConfig: jest.fn(),
}));

jest.mock('../../hooks/useIsTester', () => ({
  useIsTester: jest.fn(),
}));

describe('NewProductDetailCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render the component with the provided props', () => {
    (useRemoteConfig as unknown as jest.Mock).mockReturnValue({ getBoolean: jest.fn(() => false) });
    (useIsTester as jest.Mock).mockReturnValue(false);

    const { getByText } = render(
      <NewProductDetailCard
        images={['image1.jpg']}
        discountTag={50}
        saleOff=""
        title="Product Title"
        giftCardFirstPriceOption="R$ 99,99"
        imagesHeight={200}
        imagesWidth={200}
        onClickShare={jest.fn()}
        onGoBackImage={jest.fn()}
        onGoNextImage={jest.fn()}
        onClickFavorite={jest.fn()}
        isFavorited={false}
        loadingFavorite={false}
        setModalZoom={jest.fn()}
        imageIndexActual={() => 0}
        avaibleUnits={5}
        showZoomButton
        videoThumbnail=""
        testID="product-detail-card"
        fvcProductReference="REF123"
        installmentsNumber={0}
        installmentsPrice={0}
        price={0}
      />,
    );

    expect(getByText('Product Title')).toBeTruthy();
    expect(getByText('ÚLTIMAS UNIDADES')).toBeTruthy();
  });

  it('should trigger onClickFavorite when favorite button is pressed', () => {
    const onClickFavorite = jest.fn();

    (useRemoteConfig as unknown as jest.Mock).mockReturnValue({ getBoolean: jest.fn(() => false) });
    (useIsTester as jest.Mock).mockReturnValue(false);

    const { getByTestId } = render(
      <NewProductDetailCard
        images={['image1.jpg']}
        discountTag={50}
        saleOff=""
        title="Product Title"
        giftCardFirstPriceOption="R$ 99,99"
        imagesHeight={200}
        imagesWidth={200}
        onClickShare={jest.fn()}
        onGoBackImage={jest.fn()}
        onGoNextImage={jest.fn()}
        onClickFavorite={onClickFavorite}
        isFavorited={false}
        loadingFavorite={false}
        setModalZoom={jest.fn()}
        imageIndexActual={() => 0}
        avaibleUnits={5}
        showZoomButton
        videoThumbnail=""
        testID="product-detail-card"
        fvcProductReference="REF123"
        installmentsNumber={0}
        installmentsPrice={0}
        price={0}
      />,
    );

    const favoriteButton = getByTestId('product-detail-card_favorite');
    fireEvent.press(favoriteButton);

    expect(onClickFavorite).toHaveBeenCalledWith(true);
  });

  it('should trigger onClickShare when share button is pressed', () => {
    const onClickShare = jest.fn();

    (useRemoteConfig as unknown as jest.Mock).mockReturnValue({ getBoolean: jest.fn(() => false) });
    (useIsTester as jest.Mock).mockReturnValue(false);

    const { getByTestId } = render(
      <NewProductDetailCard
        images={['image1.jpg']}
        discountTag={50}
        saleOff=""
        title="Product Title"
        giftCardFirstPriceOption="R$ 99,99"
        imagesHeight={200}
        imagesWidth={200}
        onClickShare={onClickShare}
        onGoBackImage={jest.fn()}
        onGoNextImage={jest.fn()}
        onClickFavorite={jest.fn()}
        isFavorited={false}
        loadingFavorite={false}
        setModalZoom={jest.fn()}
        imageIndexActual={() => 0}
        avaibleUnits={5}
        showZoomButton
        videoThumbnail=""
        testID="product-detail-card"
        fvcProductReference="REF123"
        installmentsNumber={0}
        installmentsPrice={0}
        price={0}
      />,
    );

    const shareButton = getByTestId('product-detail-card_share');
    fireEvent.press(shareButton);

    expect(onClickShare).toHaveBeenCalled();
  });

  it('should trigger setModalZoom when zoom button is pressed', () => {
    const setModalZoom = jest.fn();

    (useRemoteConfig as unknown as jest.Mock).mockReturnValue({ getBoolean: jest.fn(() => false) });
    (useIsTester as jest.Mock).mockReturnValue(false);

    const { getByTestId } = render(
      <NewProductDetailCard
        images={['image1.jpg']}
        discountTag={50}
        saleOff=""
        title="Product Title"
        giftCardFirstPriceOption="R$ 99,99"
        imagesHeight={200}
        imagesWidth={200}
        onClickShare={jest.fn()}
        onGoBackImage={jest.fn()}
        onGoNextImage={jest.fn()}
        onClickFavorite={jest.fn()}
        isFavorited={false}
        loadingFavorite={false}
        setModalZoom={setModalZoom}
        imageIndexActual={() => 0}
        avaibleUnits={5}
        showZoomButton
        videoThumbnail=""
        testID="product-detail-card"
        fvcProductReference="REF123"
        installmentsNumber={0}
        installmentsPrice={0}
        price={0}
      />,
    );

    const zoomButton = getByTestId('product-detail-card_zoom');
    fireEvent.press(zoomButton);

    expect(setModalZoom).toHaveBeenCalled();
  });

  it('should render PersonalizeIcon when fvcProductReference is provided', () => {
    (useRemoteConfig as unknown as jest.Mock).mockReturnValue({ getBoolean: jest.fn(() => true) });
    (useIsTester as jest.Mock).mockReturnValue(false);

    const { getByTestId } = render(
      <NewProductDetailCard
        images={['image1.jpg']}
        discountTag={50}
        saleOff=""
        title="Product Title"
        giftCardFirstPriceOption="R$ 99,99"
        imagesHeight={200}
        imagesWidth={200}
        onClickShare={jest.fn()}
        onGoBackImage={jest.fn()}
        onGoNextImage={jest.fn()}
        onClickFavorite={jest.fn()}
        isFavorited={false}
        loadingFavorite={false}
        setModalZoom={jest.fn()}
        imageIndexActual={() => 0}
        avaibleUnits={5}
        showZoomButton
        videoThumbnail=""
        testID="product-detail-card"
        fvcProductReference="REF123"
        installmentsNumber={0}
        installmentsPrice={0}
        price={0}
      />,
    );

    const personalizeIcon = getByTestId('product-detail-card_pdp_icon_fvc');
    expect(personalizeIcon).toBeTruthy();
  });

  it('should be not render PersonalizeIcon when fvcProductReference is provided with future flag false', () => {
    (useRemoteConfig as unknown as jest.Mock).mockReturnValue({ getBoolean: jest.fn(() => false) });
    (useIsTester as jest.Mock).mockReturnValue(false);

    const { queryByTestId } = render(
      <NewProductDetailCard
        images={['image1.jpg']}
        discountTag={50}
        saleOff=""
        title="Product Title"
        giftCardFirstPriceOption="R$ 99,99"
        imagesHeight={200}
        imagesWidth={200}
        onClickShare={jest.fn()}
        onGoBackImage={jest.fn()}
        onGoNextImage={jest.fn()}
        onClickFavorite={jest.fn()}
        isFavorited={false}
        loadingFavorite={false}
        setModalZoom={jest.fn()}
        imageIndexActual={() => 0}
        avaibleUnits={5}
        showZoomButton
        videoThumbnail=""
        testID="product-detail-card"
        fvcProductReference="REF123"
        installmentsNumber={0}
        installmentsPrice={0}
        price={0}
      />,
    );

    expect(queryByTestId('product-detail-card_pdp_icon_fvc')).toBeNull();
  });
});
