import React, { useState } from 'react';
import {
  Box,
  Button,
  Icon,
  Typography,
} from '@usereservaapp/reserva-ui';

interface IExpandProductDescription {
  description: string;
  composition: string;
  codeProduct: string;
}

export const ExpandProductDescription = ({ description, composition, codeProduct }: IExpandProductDescription) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <Box>

      <Button
        testID="com.usereserva:id/about_this_product_button"
        variant="semBorda"
        marginTop="xxxs"
        onPress={() => setShowDescription(!showDescription)}
        flexDirection="row"
      >
        <>
          {showDescription
            ? (
              <Box alignSelf="center" paddingRight="quarck" paddingLeft="quarck">
                <Icon name="Subtraction" color="fullBlack" size={20} />
              </Box>
            )
            : (
              <Box alignSelf="center" paddingRight="nano">
                <Icon name="Add" color="fullBlack" size={20} />
              </Box>
            )}
          <Box flex={1}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Sobre este produto
            </Typography>
          </Box>
        </>
      </Button>
      {showDescription && (
        <>
          <ProductDescription
            title="Detalhes do Produto"
            description={description}
            testID="com.usereserva:id/details_product"
          />
          {composition && (
          <ProductDescription
            title="Composição"
            description={composition}
            testID="com.usereserva:id/composition"

          />
          )}
          <ProductDescription
            title="Código do Produto"
            description={`Ref: ${codeProduct}`}
            testID="com.usereserva:id/code"
          />
        </>
      )}
    </Box>
  );
};
interface IProductDescription {
  title: string;
  description: string;
  testID: string;
}

const ProductDescription: React.FC<IProductDescription> = ({ title, description, testID }) => (
  <Box testID={testID}>
    <Box mt="xxs">
      <Typography
        fontFamily="nunitoBold"
        fontSize={15}
      >
        {title}
      </Typography>
      <Box mt="nano">
        <Typography
          fontFamily="nunitoRegular"
          fontSize={13}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  </Box>
);
