import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Box, Typography } from 'reserva-ui';

export const TopBarBackButton: React.FC<{
	message?: string;
}> = ({ message = true }) => {
	const navigation = useNavigation();

	return (
    <Box height={20} alignItems="center">
      <Typography>
        {message}
      </Typography>
    </Box>
	);
};
