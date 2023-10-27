import React from 'react';

import { Box } from '../../../../components/Box/Box';
import { Skeleton } from '../../../../modules/Checkout/components/Skeleton';

export default function BagSkeleton() {
  return (
    <Skeleton testID="com.usereserva:id/BagSkeleton">
      <Box marginRight="xs" marginLeft="xxs">
        <Box
          bg="neutroFrio1"
          height={35}
          width={175}
          marginTop="xxs"
        />

        <Box flexDirection="row" marginTop="xxs">
          <Box
            bg="neutroFrio1"
            width={99}
            height={148}
            marginRight="nano"
          />

          <Box width={217} height={148}>
            <Box bg="neutroFrio1" width={217} height={22} />

            <Box width="100%" flexDirection="row">
              <Box
                bg="neutroFrio1"
                width={79}
                height={18}
                marginTop="nano"
                marginRight="nano"
              />
              <Box
                bg="neutroFrio1"
                width={79}
                height={18}
                marginTop="nano"
              />
            </Box>

            <Box
              bg="neutroFrio1"
              width={167}
              height={18}
              marginTop="nano"
            />
            <Box
              bg="neutroFrio1"
              width={221}
              height={18}
              marginTop="nano"
            />
            <Box
              bg="neutroFrio1"
              width={115}
              height={22}
              marginTop="nano"
            />
          </Box>
        </Box>

        <Box
          bg="neutroFrio1"
          width="100%"
          height={2}
          marginTop="xxs"
          marginBottom="xxs"
        />

        <Box flexDirection="row">
          <Box
            bg="neutroFrio1"
            width={232}
            height={22}
            marginRight="xxxs"
          />
          <Box bg="neutroFrio1" width={77} height={22} />
        </Box>

        <Box
          bg="neutroFrio1"
          width="100%"
          height={2}
          marginTop="xxs"
          marginBottom="xxs"
        />

        <Box bg="neutroFrio1" width={232} height={22} />

        <Box
          bg="neutroFrio1"
          width="100%"
          height={47}
          marginTop="xxs"
        />

        <Box flexDirection="row" marginTop="xxxs" width="100%">
          <Box
            bg="neutroFrio1"
            width={200}
            height={50}
            marginRight="micro"
          />
          <Box bg="neutroFrio1" width={122} height={50} />
        </Box>

        <Box flexDirection="row" marginTop="xxxs" width="100%">
          <Box
            bg="neutroFrio1"
            width={200}
            height={50}
            marginRight="micro"
          />
          <Box bg="neutroFrio1" width={122} height={50} />
        </Box>

        <Box flexDirection="row" marginTop="xxxs" width="100%">
          <Box
            bg="neutroFrio1"
            width={200}
            height={50}
            marginRight="micro"
          />
          <Box bg="neutroFrio1" width={122} height={50} />
        </Box>
      </Box>
    </Skeleton>
  );
}
