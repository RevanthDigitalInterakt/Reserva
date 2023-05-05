import * as React from 'react';
import {
  Typography,
  Box,
  Button,
  Icon,
} from '@usereservaapp/reserva-ui';

export interface ICouponBadge {
  value: string;
  onPress: () => void;
  testID?: string;
}
export const CouponBadge: React.FC<ICouponBadge> = ({ value, onPress, testID }) => (
  <Box
    borderColor="divider"
    borderWidth="hairline"
    bg="backgoundInput"
    flexDirection="row"
    alignItems="center"
    px="micro"
    height={34}
    alignSelf="flex-start"
    borderRadius="pico"
    marginTop="nano"
    mr="nano"
    testID="com.usereserva:id/coupon-badge-container"
  >
    <Typography fontFamily="nunitoRegular" fontSize={13}>
      {value}
    </Typography>
    <Button
      onPress={onPress}
      marginLeft="micro"
      variant="icone"
      icon={<Icon name="Close" size={10} />}
      testID={testID}

    />
  </Box>
);
