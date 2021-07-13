import * as React from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Icon
} from 'reserva-ui';
import { useCart } from "../../../context/CartContext";
import { removeCoupons } from "../../../store/ducks/orders/actions";

export interface ICouponBadge {
  value: string;
}
export const CouponBadge: React.FC<ICouponBadge> = ({ value }) => {

  const { removeCoupon, removeSellerCoupon } = useCart();

  const handleRemoveCoupon = async () => {

    // await removeCoupon('');
    await removeSellerCoupon('')
    console.log('codigo', value)
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
      mr="nano"
    >
      <Typography fontFamily={"nunitoRegular"} fontSize={13}>
        {value}
      </Typography>
      <Button
        onPress={handleRemoveCoupon}
        marginLeft={"micro"}
        variant={"icone"}
        icon={<Icon name="Close" size={10} />}
      />
    </Box>
  );
}