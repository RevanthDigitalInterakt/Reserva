import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Typography, Box, Divider, Icon, } from "@usereservaapp/reserva-ui";

interface ItemListHelpProps {
  title: string,
  onPress?: Function,
}

const ItemList = ({
  title,
  onPress,
}: ItemListHelpProps) => {

  return (
    <>
      <TouchableOpacity onPress={onPress}>
       <Box mb={'xxs'} mt={'xxs'} flexDirection={"row"}>
         <Box>
          <Typography fontSize={14} fontFamily={'nunitoBold'}>{title}</Typography>
         </Box>
       </Box>
      </TouchableOpacity>
      <Divider variant={"fullWidth"} />
    </>
  );
};

export default ItemList;
