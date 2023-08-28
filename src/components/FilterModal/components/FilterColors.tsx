import React, { useMemo, useState } from 'react';
import { createAnimatableComponent } from 'react-native-animatable';

import type { SearchFacetColorItemOutput } from '../../../base/graphql/generated';
import { Box } from '../../Box/Box';
import { SelectColorFilter } from '../../SelectColorFilter/SelectColorFilter';
import TitleFilter from './TitleFilter';

const BoxAnimation = createAnimatableComponent(Box);

interface IFilterColors {
  data: SearchFacetColorItemOutput[];
  selectedItems: Set<string>;
  onUpdate: (item: Set<string>) => void;
}

function FilterColors({ data, selectedItems, onUpdate }: IFilterColors) {
  const [showSection, setShowSection] = useState(false);

  const colors = useMemo(() => (
    data.map((item) => ({
      ...item,
      id: item.value,
      value: item.hex,
    }))
  ), [data]);

  return (
    <>
      <TitleFilter
        showMore={showSection}
        setShowMore={setShowSection}
        showSeeMoreButton={data.length > 6}
        title="Cores"
      />

      <BoxAnimation animation="fadeIn" paddingX="micro">
        <SelectColorFilter
          disabledColors={[]}
          listColors={showSection ? colors : colors.slice(0, 6)}
          onPress={(color) => {
            const newSet = new Set(Array.from(selectedItems));

            if (newSet.has(color)) {
              newSet.delete(color);
            } else {
              newSet.add(color);
            }

            onUpdate(newSet);
          }}
          selectedColors={Array.from(selectedItems)}
          size={23}
        />
      </BoxAnimation>
    </>
  );
}

export default FilterColors;
