import React from 'react';
import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import { createAnimatableComponent } from 'react-native-animatable';

const BoxAnimation = createAnimatableComponent(Box);

interface ITitleFilter {
  title: string;
  showMore: boolean;
  showSeeMoreButton: boolean;
  setShowMore: (val: boolean) => void;
}

function TitleFilter({
  title,
  showMore,
  setShowMore,
  showSeeMoreButton,
}: ITitleFilter) {
  return (
    <Box
      paddingX="micro"
      paddingY="micro"
      justifyContent="space-between"
      flexDirection="row"
      testID="com.usereserva:id/title_filter_modal_container"
    >
      <Typography
        testID="com.usereserva:id/filter_modal_title"
        fontFamily="reservaSerifRegular"
        fontSize="16px"
      >
        {title}
      </Typography>

      {!!showSeeMoreButton && (
        <Button
          testID="com.usereserva:id/title_filter_modal_button_ceeMore"
          onPress={() => setShowMore(!showMore)}
          hitSlop={{ left: 50, top: 15, bottom: 15 }}
        >
          <BoxAnimation
            testID="com.usereserva:id/title_animation_filter_modal"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontFamily="nunitoRegular" fontSize="12px">
              Ver mais
            </Typography>

            <Icon
              style={
                showMore
                  ? { transform: [{ rotate: '-90deg' }] }
                  : { transform: [{ translateY: 4 }] }
              }
              name={showMore ? 'ChevronRight' : 'ArrowDown'}
              color="preto"
              marginY="quarck"
              marginX="nano"
              size={12}
            />
          </BoxAnimation>
        </Button>
      )}
    </Box>
  );
}

export default TitleFilter;
