import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Linking, SafeAreaView, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Typography, Box, Icon, Divider } from "reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

type ItemContactProps = {
  local: string;
  label: string;
  icon: string;
  onPress?: Function;
  divider?: boolean;
};

export const ContactUs: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => { }, []);

  const ItemContact = ({ local, label, icon, onPress, divider }: ItemContactProps) => {
    return (
      <Box width={"100%"}>
        <TouchableOpacity onPress={onPress}>
          <Box
            pb={"xxxs"}
            pt={"xxxs"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box justifyContent={"center"} flexDirection={"row"} alignItems="center">

              <Box mr={"micro"}>
                <Icon name={icon} size={20} />
              </Box>

              <Box>
                {local &&
                  <Typography color="borderColorProduct">{local}</Typography>
                }
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
            local={"(Rio de Janeiro capital)"}
            label={"(21) 2108-4990"}
            onPress={() => {
              Linking.openURL(`tel: (21) 2108-4990`);
            }}
          />
          <ItemContact
            divider={true}
            icon={"Phone"}
            local={"(Demais localidades)"}
            label={"(11) 2388-8280"}
            onPress={() => {
              Linking.openURL(`tel: (11) 2388-8280`);
            }}
          />
          <ItemContact
            icon={"Whatsapp"}
            label={"Whatsapp Reserva"}
            onPress={() => {
              navigation.navigate("WhatsappsHelp");
            }}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
