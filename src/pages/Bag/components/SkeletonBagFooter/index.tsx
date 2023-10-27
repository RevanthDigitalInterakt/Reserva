import React from 'react';
import { Box } from '../../../../components/Box/Box';

export default function SkeletonBagFooter() {
  return (
    <Box px="xxs" testID="com.usereserva:id/skeletonBagFooter_bag">
      <Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginTop="micro"
        >
          <Box>
            <Box bg="neutroFrio1" width={63} height={22} />
            <Box
              bg="neutroFrio1"
              width={95}
              height={22}
              marginTop="nano"
            />
          </Box>

          <Box alignItems="flex-end">
            <Box bg="neutroFrio1" width={63} height={22} />
            <Box
              bg="neutroFrio1"
              width={95}
              height={22}
              marginTop="nano"
            />
          </Box>
        </Box>

        <Box
          bg="neutroFrio1"
          width="100%"
          height={50}
          marginTop="micro"
        />
      </Box>
    </Box>
  );
}
