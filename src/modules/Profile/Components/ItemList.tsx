import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Divider, Icon, Typography } from "@usereservaapp/reserva-ui";

interface ItemListProps {
  title: string;
  descr: string;
  onPress?: () => void;
  icon: string;
  arrowDown?: boolean;
  dropdownActive?: boolean;
}

const ItemList = ({ onPress, icon, title, descr, arrowDown, dropdownActive }: ItemListProps) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Box mb={"micro"} mt={"micro"} flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box flexDirection={"row"}  alignItems="center">
            <Box pr={"micro"} justifyContent="flex-start">
              {icon != undefined && <Icon name={icon} size={20}></Icon>}
            </Box>

            <Box>
              <Typography fontSize={14} fontFamily={"nunitoBold"}>
                {title}
              </Typography>
              <Typography fontSize={14} fontFamily={"nunitoRegular"}>
                {descr}
              </Typography>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="center" >
            {arrowDown && (
              <Box alignItems="center" justifyContent="center">
                <Icon name={dropdownActive ? "ArrowUp" : "ArrowDown"} color="vermelhoAlerta" size={18}></Icon>
              </Box>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
      <Divider variant={"fullWidth"} />
    </>
  );
};

export default ItemList;
