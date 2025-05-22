import React, { useMemo, useState } from 'react';
import TitleFilter from './TitleFilter';
import type { SearchFacetItemOutput } from '../../../base/graphql/generated';
import RadioButtonsFilter from '../../RadioButtonsFilter';
import { Box } from '../../Box/Box';

interface IFilterSizes {
  data: SearchFacetItemOutput[];
  selectedItems: Set<string>;
  onUpdate: (item: Set<string>) => void;
}

function FilterSizes({ data, selectedItems, onUpdate }: IFilterSizes) {
  const [showSection, setShowSection] = useState(false);

  const sizes = useMemo(() => (
    data.map((item) => ({
      ...item,
      value: item.value,
    }))
  ), [data]);

  return (
    <>
      <TitleFilter
        showMore={showSection}
        setShowMore={setShowSection}
        showSeeMoreButton={data.length > 6}
        title="Tamanho"
      />

      <Box paddingY="micro" paddingX="micro">
        <RadioButtonsFilter
          onSelectedChange={(size: string[]) => {
            const items = size.filter(Boolean);
            onUpdate(new Set(items));
          }}
          disabledOptions={[]}
          defaultSelectedItem={Array.from(selectedItems)}
          size="34px"
          fontSize="10px"
          optionsList={showSection ? sizes : sizes.slice(0, 5)}
        />
      </Box>
    </>
  );
}

export default FilterSizes;
