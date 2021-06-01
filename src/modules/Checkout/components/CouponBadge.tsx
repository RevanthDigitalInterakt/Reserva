import * as React from "react";
import { useDispatch } from "react-redux";
import {
    Typography,
    Box,
    Button,
    Icon
} from 'reserva-ui';
import { removeCoupons } from "../../../store/ducks/orders/actions";

export interface ICouponBadge {
  value: string;
}
export const CouponBadge: React.FC<ICouponBadge> = ({ value }) => {
  const dispatch = useDispatch();
  
  const removeCoupon = (couponId: string) => {
    dispatch(removeCoupons(couponId)); 
  } 

  return (
    <Box
      borderColor="divider"
      borderWidth="hairline"
      bg={"backgoundInput"}
      flexDirection={"row"}
      alignItems="center"
      px={"micro"}
      height={34}
      alignSelf={"flex-start"}
      borderRadius={"pico"}
      marginTop="nano"
    >
      <Typography fontFamily={"nunitoRegular"} fontSize={13}>
        {value}
      </Typography>
      <Button
        onPress={() => { removeCoupon(value) }}
        marginLeft={"micro"}
        variant={"icone"}
        icon={<Icon name="Close" size={10} />}
      />
    </Box>
  );
}