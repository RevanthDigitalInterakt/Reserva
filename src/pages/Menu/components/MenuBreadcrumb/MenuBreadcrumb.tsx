import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import * as React from 'react';

interface IMenuBreadcrumb {
  title: string;
  onPress: () => void;
}

function MenuBreadcrumb({ title, onPress }: IMenuBreadcrumb) {
  return (
    <Button
      onPress={onPress}
      alignSelf="flex-start"
      testID="com.usereserva:id/button_menu_initial"
    >
      <Box
        testID="com.usereserva:id/menu_initial_container"
        alignSelf="flex-start"
        paddingX="micro"
        paddingTop="nano"
        alignItems="center"
        flexDirection="row"
      >
        <Icon name="MenuArrowBack" color="preto" size={22} />

        <Box paddingX="micro">
          <Typography fontSize={12} fontFamily="nunitoRegular">
            {title}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
}

export default MenuBreadcrumb;
