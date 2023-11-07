import React from 'react';
import { Box } from '../../Box/Box';
import { Typography } from '../../Typography/Typography';
import { Button } from '../../Button';
import { IconLegacy } from '../../IconLegacy/IconLegacy';

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
          <Box
            testID="com.usereserva:id/title_animation_filter_modal"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontFamily="nunitoRegular" fontSize="12px">
              Ver mais
            </Typography>

            <IconLegacy
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
          </Box>
        </Button>
      )}
    </Box>
  );
}

export default TitleFilter;
