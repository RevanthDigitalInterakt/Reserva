import * as React from 'react';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';

export interface ICouponBadge {
  value: string;
  onPress: () => void;
  testID?: string;
}
export function CouponBadge({ value, onPress, testID }: ICouponBadge) {
  return (
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
        icon={<IconLegacy name="Close" size={10} />}
        testID={testID}
      />
    </Box>
  );
}
