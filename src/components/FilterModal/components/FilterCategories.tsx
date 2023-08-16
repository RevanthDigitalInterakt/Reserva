import React, { useMemo, useState } from 'react';
import { createAnimatableComponent } from 'react-native-animatable';
import TitleFilter from './TitleFilter';
import type { SearchFacetItemOutput } from '../../../base/graphql/generated';
import { Box } from '../../Box/Box';
import { CheckboxListFilter } from '../../../modules/ProductCatalog/modals/FilterModal/FilterModal';

const BoxAnimation = createAnimatableComponent(Box);

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

      <BoxAnimation animation="fadeIn" paddingX="micro">
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
      </BoxAnimation>
    </>
  );
}

export default FilterCategories;
