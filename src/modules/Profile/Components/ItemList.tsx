import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Typography, Box, Divider, Icon, } from "reserva-ui";

interface ItemListProps {
  title: string,
  descr: string,
  onPress?: Function,
  icon: string
}

const ItemList = ({
  onPress,
  icon,
  title,
  descr
}: ItemListProps) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={onPress}>
       <Box mb={15} mt={15} flexDirection={"row"}>
         <Box pr={10} justifyContent="flex-start">
           {icon != undefined && (
             <Icon name={icon} size={20}></Icon>
           )}
         </Box>

         <Box>
          <Typography fontSize={14} fontFamily={'nunitoBold'}>{title}</Typography>
          <Typography fontSize={14} fontFamily={'nunitoRegular'}>{descr}</Typography>
         </Box>
       </Box>
      </TouchableOpacity>
      <Divider variant={"fullWidth"} />
    </>
  );
};

export default ItemList;
