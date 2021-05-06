import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Linking, SafeAreaView, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Typography, Box, Icon, Divider } from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

type ItemContactProps = {
  label: string;
  icon: string;
  onPress?: Function;
  divider?: boolean;
};

export const ContactUs: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const ItemContact = ({ label, icon, onPress, divider }: ItemContactProps) => {
    return (
      <Box width={"100%"}>
        <TouchableOpacity onPress={onPress}>
          <Box
            pb={"xxxs"}
            pt={"xxxs"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box justifyContent={"center"} flexDirection={"row"}>
              <Box mr={"micro"}>
                <Icon name={icon} size={20} />
              </Box>

              <Box>
                <Typography fontFamily={"nunitoRegular"} fontSize={15}>
                  {label}
                </Typography>
              </Box>
            </Box>

            <Icon name="ArrowProcced" size={26} />
          </Box>
        </TouchableOpacity>
        {divider === true && <Divider variant={"fullWidth"} />}
      </Box>
    );
  };

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box variant="container" flex={1} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"micro"} alignSelf={"flex-start"}>
            <Typography variant={"tituloSessoes"}>Fale conosco</Typography>
          </Box>

          <ItemContact
            divider={true}
            icon={"Mail"}
            label={"sac@usereserva.com"}
          />
          <ItemContact
            divider={true}
            icon={"Phone"}
            label={"(21) 2108-4990"}
            onPress={() => {
              Linking.openURL(`tel: (21) 2108-4990`);
            }}
          />
          <ItemContact
            icon={"Whatsapp"}
            label={"WhatsApp"}
            onPress={() => {
              navigation.navigate("WhatsappsHelp");
            }}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
