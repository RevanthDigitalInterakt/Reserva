import { ConfirmAccessCode } from '../../modules/Register/pages/ConfirmAccessCode';
import { RegisterEmail } from '../../modules/Register/pages/RegisterEmail';
import { ForgotEmailSuccess } from '../../modules/Forgot/pages/ForgotEmailSuccess';
import { ForgotNewPassword } from '../../modules/Forgot/pages/ForgotNewPassword';
import { ForgotPassword } from '../../modules/Forgot/pages/ForgotPassword';
import { Flow } from '../types/flow.type';

export const RegisterFlow: Flow[] = [
    //   {
    //     component: ForgotNewPassword,
    //     name: 'ForgotNewPassword',
    //   },
    //   {
    //     component: ForgotPassword,
    //     name: 'ForgotPassword',
    //   },
    {
        component: RegisterEmail,
        name: 'RegisterEmail',
    },
    //   {
    //     component: ForgotEmailSuccess,
    //     name: 'ForgotEmailSuccess',
    //   },
    {
        component: ConfirmAccessCode,
        name: 'ConfirmAccessCode',
    },
];
