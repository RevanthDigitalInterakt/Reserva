import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button } from "reserva-ui";
import { ApplicationState } from "../../../store";
import { loadProducts } from "../../../store/ducks/products/actions";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";

export const ExampleScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { products } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <Box flex={1}>
      <TopBarDefault />
      <Box variant="container" alignItems="flex-start" justifyContent="center">
        <Typography fontFamily="reservaSerifBold" fontSize={24}>
          Lista de Repositórios
        </Typography>
        <Button
          onPress={() => navigation.navigate("MyModal")}
          title="Open Modal"
        />
        {products.loading ? (
          <Typography>Loading</Typography>
        ) : (
          products.data.map((product) => {
            return <Typography>{product.title}</Typography>;
          })
        )}
      </Box>
    </Box>
  );
};
