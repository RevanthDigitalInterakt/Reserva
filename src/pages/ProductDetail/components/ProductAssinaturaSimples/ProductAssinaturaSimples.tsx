import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import testProps from '../../../../utils/testProps';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { ModalAssinaturaTerms } from './ModalAssinaturaTerms';
import { Box } from '../../../../components/Box/Box';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import { Divider } from '../../../../components/Divider/Divider';

function ProductAssinaturaSimples() {
  const { productDetail, assinaturaSimples } = useProductDetailStore(['productDetail', 'assinaturaSimples']);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const renderIconCheck = useCallback(() => (
    <Box
      alignItems="center"
      justifyContent="center"
      backgroundColor="verdeSucesso"
      width={20}
      height={20}
      borderRadius="xxxs"
      mr="micro"
    >
      <IconLegacy name="Check" size={18} color="white" mt="nano" ml="quarck" />
    </Box>
  ), []);

  if (!productDetail?.properties.isAssinaturaSimples) return null;

  return (
    <>
      <ModalAssinaturaTerms
        isVisible={showTermsModal}
        setIsVisible={setShowTermsModal}
      />

      <Box flexDirection="row" alignItems="center" mb="xxxs">
        {renderIconCheck()}

        <Box>
          <Box flexDirection="row">
            <Typography variant="tituloSessao">Receba </Typography>
            <Typography variant="tituloSessao" fontWeight="bold">3 camisetas </Typography>
            <Typography variant="tituloSessao">nos 12 meses de</Typography>
          </Box>

          <Typography variant="tituloSessao">assinatura.</Typography>
        </Box>
      </Box>

      <Box flexDirection="row" mb="xxxs" alignItems="center">
        {renderIconCheck()}

        <Box flexDirection="row" alignItems="center">
          <Typography variant="tituloSessao" fontWeight="bold">Ganhe 100% </Typography>
          <Typography variant="tituloSessao">de </Typography>
          <Typography variant="tituloSessao" fontStyle="italic">cashback </Typography>

          <Box flexDirection="row" alignSelf="flex-start" mb="nano">
            <Typography fontSize={3}>*</Typography>
            <Typography fontSize={2}>1</Typography>
          </Box>

          <Typography fontSize={2}>.</Typography>
        </Box>
      </Box>

      <Box flexDirection="row" alignItems="center" mb="xxxs">
        {renderIconCheck()}

        <Box>
          <Box flexDirection="row" alignItems="center">
            <Typography variant="tituloSessao" fontWeight="bold"> Receba 20% OFF </Typography>
            <Typography variant="tituloSessao">em todas as compras</Typography>

            <Box flexDirection="row" alignSelf="flex-start" mb="nano">
              <Typography fontSize={3}>*</Typography>
              <Typography fontSize={2}>2</Typography>
            </Box>
          </Box>

          <Typography variant="tituloSessao">acima de R$ 399.</Typography>
        </Box>
      </Box>

      <Box flexDirection="row" alignItems="center" mb="xxxs">
        {renderIconCheck()}

        <Box>
          <Box flexDirection="row">
            <Typography variant="tituloSessao" fontWeight="bold">Ganhe R$ 75 </Typography>
            <Typography variant="tituloSessao">em créditos ao fim da anuidade, </Typography>
          </Box>

          <Box flexDirection="row">
            <Typography variant="tituloSessao">caso queira devolver as 3 camisetas</Typography>

            <Box flexDirection="row" alignSelf="flex-start" mb="nano">
              <Typography fontSize={3}>*</Typography>
              <Typography fontSize={2}>3</Typography>
            </Box>

            <Typography variant="tituloSessao">.</Typography>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="row" alignItems="center" mb="xxs">
        {renderIconCheck()}

        <Box>
          <Typography variant="tituloSessao">
            Ciclo sustentável: as peças devolvidas serão
            {' '}
          </Typography>

          <Typography variant="tituloSessao">
            recicladas.
          </Typography>
        </Box>
      </Box>

      <Box p="nano" backgroundColor="backgoundDivider">
        <Box flexDirection="row">
          <Typography variant="precoAntigo3" fontSize={1} color="searchBarTextColor">*1</Typography>
          <Typography variant="precoAntigo3" color="searchBarTextColor">
            : Créditos mensais não cumulativos, expiram a cada 30
          </Typography>
        </Box>

        <Typography variant="precoAntigo3" color="searchBarTextColor">dias.</Typography>

        <Box flexDirection="row" mt="quarck">
          <Typography variant="precoAntigo3" fontSize={1} color="searchBarTextColor">*2</Typography>
          <Typography variant="precoAntigo3" color="searchBarTextColor">
            : 20% de desconto exceto para itens já em promoção.
          </Typography>
        </Box>

        <Box flexDirection="row" mt="quarck">
          <Typography variant="precoAntigo3" fontSize={1} color="searchBarTextColor">*3</Typography>
          <Typography variant="precoAntigo3" color="searchBarTextColor">
            : Ao final da anuidade, crédito de R$ 25 por camiseta
          </Typography>
        </Box>

        <Typography variant="precoAntigo3" color="searchBarTextColor">
          SimplesⓇ devolvida em lojas Reserva
        </Typography>
      </Box>

      <Box flexDirection="row" alignItems="center" mt="xxxs">
        <TouchableOpacity
          {...testProps('com.usereserva:id/modal_accept_conditions_product_details')}
          onPress={() => assinaturaSimples.onToggleAccept()}
        >
          <Box
            backgroundColor={assinaturaSimples.accepted ? 'preto' : 'white'}
            width={14}
            height={14}
            border="1px"
            borderColor="preto"
            borderRadius="pico"
            mr="nano"
            alignItems="center"
            justifyContent="center"
          >
            {assinaturaSimples.accepted && (
              <IconLegacy name="Check" size={14} color="white" mt="nano" ml="quarck" />
            )}
          </Box>
        </TouchableOpacity>

        <Box>
          <Box flexDirection="row" alignItems="center">
            <Typography variant="precoAntigo3" color="preto">
              {'Ao adquirir a assinatura você aceita os '}
            </Typography>

            <TouchableOpacity
              {...testProps('com.usereserva:id/modal_terms_conditions_product_details')}
              onPress={() => setShowTermsModal(true)}
            >
              <Typography
                variant="precoAntigo3"
                color="preto"
                fontWeight="bold"
                style={{ textDecorationLine: 'underline' }}
              >
                termos e
              </Typography>
            </TouchableOpacity>
          </Box>

          <TouchableOpacity
            {...testProps('com.usereserva:id/modal_terms_conditions_product_details')}
            onPress={() => setShowTermsModal(true)}
          >
            <Typography
              variant="precoAntigo3"
              color="preto"
              fontWeight="bold"
              style={{ textDecorationLine: 'underline' }}
            >
              condições.
            </Typography>
          </TouchableOpacity>
        </Box>
      </Box>

      <Divider variant="fullWidth" my="xs" />
    </>
  );
}

export default ProductAssinaturaSimples;
