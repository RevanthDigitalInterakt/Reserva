import React from 'react';
import { OffersCarousels } from './Components/OffersCarousels/OffersCarousels';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';

function OffersPage() {
  return (
    <>
      <TopBarDefault showShadow />
      <OffersCarousels />
    </>
  );
}

export default OffersPage;
