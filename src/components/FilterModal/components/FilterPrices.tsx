import React, { useState } from 'react';
import { createAnimatableComponent } from 'react-native-animatable';
import TitleFilter from './TitleFilter';
import type { SearchFacetRangeOutput } from '../../../base/graphql/generated';

import configDeviceSizes from '../../../utils/configDeviceSizes';
import { Box } from '../../Box/Box';
import { Range } from '../../Range/Range';

const BoxAnimation = createAnimatableComponent(Box);

interface IFilterPrices {
  data: SearchFacetRangeOutput;
  selectedPriceRange?: { from: number; to: number; };
  onUpdatePriceRange: (obj: { from: number; to: number; }) => void;
}

function FilterPrices({ data, selectedPriceRange, onUpdatePriceRange }: IFilterPrices) {
  const [showSection, setShowSection] = useState(false);

  if (!data?.from || !data?.to) return null;

  return (
    <>
      <TitleFilter
        showMore={showSection}
        setShowMore={setShowSection}
        showSeeMoreButton
        title="Preço"
      />

      <BoxAnimation animation="fadeIn" paddingX="micro" alignSelf="center">
        <Range
          max={data.to}
          min={data.from}
          onValuesChange={(prices: number[]) => {
            const minPrice = prices[0];
            const maxPrice = prices[1];

            onUpdatePriceRange({ from: minPrice, to: maxPrice });
          }}
          mdxType="Range"
          originalType={() => { }}
          prefix="R$ "
          value={[selectedPriceRange?.from || data.from, selectedPriceRange?.to || data.to]}
          width={configDeviceSizes.DEVICE_WIDTH - 100}
        />
      </BoxAnimation>
    </>
  );
}

export default FilterPrices;
