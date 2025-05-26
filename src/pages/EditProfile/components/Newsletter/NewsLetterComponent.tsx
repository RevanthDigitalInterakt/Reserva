import { useMutation } from '@apollo/client';
import React, { useCallback } from 'react';

import { Box } from '../../../../components/Box/Box';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import subscribeNewsLetter from '../../../../graphql/profile/newsLetter';

interface INewsLetterProps {
  userEmail: string;
  value: boolean;
  handleToogleNewsLetterState: (value: boolean) => void
}
function NewsLetterComponent({
  userEmail,
  value,
  handleToogleNewsLetterState,
}: INewsLetterProps): JSX.Element {
  const [updateNewsLetter] = useMutation(subscribeNewsLetter);

  const handleUpdateNewsLetter = useCallback(async (): Promise<void> => {
    const { data } = await updateNewsLetter({
      variables: {
        email: userEmail,
        isNewsletterOptIn: !value,
      },
    });

    if (data.subscribeNewsletter) {
      handleToogleNewsLetterState(!value);
    }
  }, [userEmail, value]);

  return (
    <Box mb="xs" flexDirection="row" zIndex={2}>
      <Checkbox
        testID="com.usereserva:id/newsletter_button"
        fontFamily="nunitoRegular"
        fontSize={12}
        color="dropDownBorderColor"
        selectedColor="preto"
        width="100%"
        checked={value}
        onCheck={handleUpdateNewsLetter}
        optionName="Desejo receber e-mails com promoções das marcas Reserva."
      />
    </Box>
  );
}

export default NewsLetterComponent;
