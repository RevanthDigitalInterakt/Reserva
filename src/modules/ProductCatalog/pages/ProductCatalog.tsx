import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  theme,
  Image,
  ProductVerticalListCard,
  Button,
  Typography,
  Icon,
  Picker,
  SearchBar,
  Pill,
} from 'reserva-ui';
import { images } from '../../../assets';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { FilterModal } from '../modals/FilterModal';

const windowWidth = Dimensions.get('window').width;

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

export const ProductCatalog: React.FC<Props> = ({ route, navigation }) => {
  const { safeArea } = route.params;
  const { search } = route.params;

  const dispatch = useDispatch();

  const [filterVisible, setFilterVisible] = React.useState(false);
  const [sorterVisible, setSorterVisible] = React.useState(false);
  const [filterList, setFilterList] = React.useState<string[]>([]);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const DynamicComponent = safeArea ? SafeAreaView : Box;

  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? <TopBarDefaultBackButton /> : <TopBarDefault />}
      {search && (
        <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
          <SearchBar height={36} placeholder="Buscar" />
        </Box>
      )}
      <FilterModal
        filterList={filterList}
        setFilterList={setFilterList}
        isVisible={filterVisible}
        onConfirm={() => { }}
        onCancel={() => setFilterVisible(false)}
        onClose={() => setFilterVisible(false)}
        title="Excluir endereço"
        confirmText={'Ok'}
        subtitle="Tem certeza que deseja excluir o endereço salvo?"
      />
      <Picker
        onSelect={() => {
          setSorterVisible(false);
        }}
        isVisible={sorterVisible}
        items={[
          {
            text: 'Menor Preço',
          },
          {
            text: 'Maior Preço',
          },
          {
            text: 'Mais Recentes',
          },
          {
            text: 'Mais Antigos',
          },
          {
            text: 'Relevante',
          },
        ]}
        onConfirm={() => {
          setSorterVisible(false);
        }}
        onClose={() => {
          setSorterVisible(false);
        }}
        onBackDropPress={() => setSorterVisible(false)}
        title="Ordenar Por"
      />
      <ScrollView>
        <Box
          variant="container"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Box width={1 / 1}>
            <Image
              source={
                safeArea || search ? images.bannerCatalog : images.bannerOffer
              }
              width={1 / 1}
            />
            <Box bg="dropDownBorderColor">
              <Button p="nano">
                <Box flexDirection="row">
                  <Icon name="Whatsapp" size={16} color="preto"></Icon>
                  <Box marginX="nano">
                    <Typography
                      color="preto"
                      fontFamily="nunitoSemiBold"
                      fontSize={11}
                    >
                      Chama no Whats! Seja atendido sem sair de casa.{' '}
                      <Typography style={{ textDecorationLine: 'underline' }}>
                        Clique aqui!
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Button>
            </Box>
            <Box paddingY="micro" flexDirection="row" justifyContent="center">
              <Box width={1 / 2}>
                <Button
                  onPress={() => setFilterVisible(true)}
                  marginRight="nano"
                  marginLeft="micro"
                  borderRadius="nano"
                  borderColor="dropDownBorderColor"
                  borderWidth="hairline"
                  flexDirection="row"
                  inline={true}
                  height={40}
                >
                  <Typography
                    color="preto"
                    fontFamily="nunitoSemiBold"
                    fontSize="14px"
                  >
                    Filtrar
                  </Typography>
                </Button>
              </Box>

              <Box width={1 / 2}>
                <Button
                  marginRight="micro"
                  marginLeft="nano"
                  borderRadius="nano"
                  borderColor="dropDownBorderColor"
                  borderWidth="hairline"
                  flexDirection="row"
                  inline={true}
                  height={40}
                  onPress={() => {
                    setSorterVisible(true);
                  }}
                >
                  <Typography
                    color="preto"
                    fontFamily="nunitoSemiBold"
                    fontSize="14px"
                  >
                    Ordenar
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box
              paddingX="micro"
              paddingY="quarck"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography fontFamily="nunitoRegular" fontSize="13px">
                127 produtos encontrados
              </Typography>
              {filterList.length > 0 && (
                <Button onPress={() => setFilterList([])}>
                  <Typography
                    color="progressTextColor"
                    variant="precoAntigo3"
                    style={{ textDecorationLine: 'underline' }}
                  >
                    Limpar tudo
                  </Typography>
                </Button>
              )}
            </Box>
            {filterList.length > 0 && (
              <Box px="micro" flexDirection="row" py="quarck" flexWrap="wrap">
                {filterList.map((item) => (
                  <Pill
                    key={item}
                    pillText={item}
                    onPress={() => {
                      const updateList = filterList.filter(
                        (tag) => tag !== item
                      );
                      setFilterList(updateList);
                    }}
                  />
                ))}
              </Box>
            )}
            <Box
              p="micro"
              flexDirection="row"
              flex={1}
              justifyContent="space-between"
            >
              <ProductVerticalListCard
                currency="R$"
                discountTag={18}
                imageSource={images.shirt3}
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                priceWithDiscount={297.0}
                isFavorited={true}
                onClickImage={() => {
                  navigation.navigate('ProductDetail');
                }}
              />
              <ProductVerticalListCard
                currency="R$"
                imageSource={images.shirt1}
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                isFavorited={false}
              />
            </Box>
            <Box
              p="micro"
              flexDirection="row"
              flex={1}
              justifyContent="space-between"
            >
              <ProductVerticalListCard
                currency="R$"
                discountTag={18}
                imageSource={images.shirt4}
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                priceWithDiscount={297.0}
                isFavorited={true}
              />
              <ProductVerticalListCard
                currency="R$"
                imageSource={images.shirt2}
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                isFavorited={false}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </DynamicComponent>
  );
};
