import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Component, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, theme } from "reserva-ui";
import { backgroundColor } from "styled-system";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { ApplicationState } from "../../../store";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";

type Props = StackScreenProps<RootStackParamList, "ProductCatalog">;

export const ProductCatalog: React.FC<Props> = ({ route, navigation }) => {
  const { safeArea } = route.params;

  const dispatch = useDispatch();

  const { repositories } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const DynamicComponent = safeArea ? SafeAreaView : Box;

  return (
    <DynamicComponent
      style={{ backgroundColor: safeArea ? theme.colors.white : null }}
      flex={1}
    >
      <TopBarDefault />
      <Box
        bg="backgroundApp"
        variant="container"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Typography fontFamily="reservaSerifBold" fontSize={24}>
          Lista de Repositórios
        </Typography>
        <Button
          onPress={() => navigation.navigate("MyModal")}
          title="Open Modal"
        />
        {repositories.loading ? (
          <Typography>Loading</Typography>
        ) : (
          repositories.data.map((repository) => {
            return <Typography>{repository.name}</Typography>;
          })
        )}
      </Box>
    </DynamicComponent>
  );
};
