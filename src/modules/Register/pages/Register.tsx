import React from 'react';
import { SafeAreaView } from 'react-native';
import { RegisterStep1 } from './steps/Step1';
import { RegisterStep2 } from './steps/Step2';
import { RegisterStep3} from './steps/Step3';
import { RegisterStep4 } from './steps/Step4';
import { RegisterStep5 } from './steps/Step5';
import { Wizard } from './Wizard';

export const Register: React.FC = () => {
  return (
		<SafeAreaView style={{ backgroundColor: 'white'}} flex={1}>
      <Wizard>
        <RegisterStep1 />
        <RegisterStep2 />
        <RegisterStep3 />
        <RegisterStep4 />
        <RegisterStep5 />
      </Wizard>
    </SafeAreaView>
  )
}
