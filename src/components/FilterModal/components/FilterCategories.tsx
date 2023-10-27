import React, { useMemo, useState } from 'react';
import TitleFilter from './TitleFilter';
import type { SearchFacetItemOutput } from '../../../base/graphql/generated';
import { CheckboxListFilter } from '../../CheckboxListFilter/CheckboxListFilter';
import { Box } from '../../Box/Box';

interface IFilterCategories {
  data: SearchFacetItemOutput[];
  selectedItems: Set<string>;
  onUpdate: (item: Set<string>) => void;
}

function FilterCategories({ data, selectedItems, onUpdate }: IFilterCategories) {
  const [showSection, setShowSection] = useState(false);

  const itemsSelected = useMemo(() => (
    Array.from(selectedItems).map((value) => ({ value }))
  ), [selectedItems]);

  return (
    <>
      <TitleFilter
        showMore={showSection}
        setShowMore={setShowSection}
        showSeeMoreButton={data.length > 6}
        title="Categorias"
      />

      <Box paddingX="micro">
        <CheckboxListFilter
          optionsList={showSection ? data : data.slice(0, 6)}
          selectedList={itemsSelected}
          color="dropDownBorderColor"
          selectedColor="preto"
          onCheckChange={(checkBoxList: any) => {
            if (!Array.isArray(checkBoxList)) return;

            const newSet = new Set<string>(checkBoxList.map((item) => item.value));
            onUpdate(newSet);
          }}
        />
      </Box>
    </>
  );
}

export default FilterCategories;
