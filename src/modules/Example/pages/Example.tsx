import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { Typography, Box, Button } from "reserva-ui";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";

export const ExampleScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();

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

        {/* {products.loading ? (
          <Typography>Loading</Typography>
        ) : (
          products.data.map((product) => {
            return <Typography>{product.title}</Typography>;
          })
        )} */}
      </Box>
    </Box>
  );
};
