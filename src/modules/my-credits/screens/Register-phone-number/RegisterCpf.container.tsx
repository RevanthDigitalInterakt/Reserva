import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ProfileVars, profileMutation } from '../../../../graphql/profile/profileQuery';
import { RegisterCpfView } from './RegisterCpf.view';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';

interface RegisterCpfContainerProps {
  profile: ProfileVars;
  navigateBack: () => void;
  navigateToVerifyNumber: () => void;
}

export function RegisterCpfContainer({
  profile,
  navigateBack,
  navigateToVerifyNumber,
}: RegisterCpfContainerProps) {
  const [cpf, setCpf] = useState<string>('');
  const [cpfInvalid, setCpfInvalid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [updateUserData] = useMutation(profileMutation);

  const cpfValidate = async (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return setCpfInvalid(true);

    if (
      cpf.length !== 11
      || cpf === '00000000000'
      || cpf === '11111111111'
      || cpf === '22222222222'
      || cpf === '33333333333'
      || cpf === '44444444444'
      || cpf === '55555555555'
      || cpf === '66666666666'
      || cpf === '77777777777'
      || cpf === '88888888888'
      || cpf === '99999999999'
    ) return setCpfInvalid(true);
    let add = 0;
    let i = 0;
    let rev = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);

    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return setCpfInvalid(true);

    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);

    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return setCpfInvalid(true);

    return setCpfInvalid(false);
  };

  const handleSaveCpf = async () => {
    const user = {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      email: profile?.email,
      document: cpf.replace(/[^\d]+/g, ''),
      birthDate: profile?.birthDate,
      homePhone: profile?.homePhone,
      gender: profile?.gender,
    };
    await updateUserData({
      variables: {
        fields: user,
      },
    });
    setLoading(false);
  };

  const handleNavigateToVerifyNumber = () => {
    setLoading(true);
    if (!cpfInvalid && cpf.length > 0) {
      handleSaveCpf().then(() => navigateToVerifyNumber());
    } else {
      setLoading(false);
      setCpfInvalid(true);
    }
  };

  return (
    <>
      <TopBarBackButton
        loading={loading}
        showShadow
        backButtonPress={navigateBack}
      />
      <RegisterCpfView
        valueCpf={cpf}
        onChangeText={(value) => {
          setCpf(value);
          cpfValidate(cpf);
        }}
        navigateToVerifyNumber={handleNavigateToVerifyNumber}
        cpfInvalid={cpfInvalid}
        disableButton={loading}
      />
    </>
  );
}
