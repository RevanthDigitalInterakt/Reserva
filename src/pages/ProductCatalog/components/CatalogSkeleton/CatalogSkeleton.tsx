import React from 'react';
import { Skeleton } from '../../../../modules/Checkout/components/Skeleton';
import { Box } from '../../../../components/Box/Box';

export interface ICatalogSkeletonProps {
  loading: boolean
}

export function CatalogSkeleton({ loading }: ICatalogSkeletonProps) {
  if (loading) {
    return (
      <Skeleton>
        <Box bg="neutroFrio1" width="100%" height={200} />

        <Box flexDirection="row" justifyContent="center" marginTop={34}>
          <Box width="50%">
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={40}
              marginRight={8}
              marginLeft={12}
            />
          </Box>

          <Box width="50%">
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={40}
              marginRight={12}
              marginLeft={8}
            />
          </Box>
        </Box>

        <Box flexDirection="row" justifyContent="center" marginTop={45}>
          <Box
            width="50%"
            paddingRight={12}
            paddingLeft={8}
            marginBottom={33}
          >
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={250}
            />
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={24}
              marginTop={8}
            />
            <Box />
          </Box>

          <Box
            width="50%"
            paddingRight={12}
            paddingLeft={8}
            marginBottom={33}
          >
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={250}
            />
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={24}
              marginTop={8}
            />
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="center">
          <Box
            width="50%"
            paddingRight={12}
            paddingLeft={8}
            marginBottom={33}
          >
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={250}
            />
          </Box>

          <Box
            width="50%"
            paddingRight={12}
            paddingLeft={8}
            marginBottom={33}
          >
            <Box
              bg="neutroFrio1"
              flexGrow={1}
              borderRadius={8}
              height={250}
            />
          </Box>
        </Box>
      </Skeleton>
    );
  }
  return null;
}
