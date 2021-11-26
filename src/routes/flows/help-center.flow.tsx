import { HelpCenter } from '../../modules/HelpCenter/pages/HelpCenter';
import { ClothingCare } from '../../modules/HelpCenter/PagesHelp/ClothingCare';
import { ContactUs } from '../../modules/HelpCenter/PagesHelp/ContactUs';
import { Exchanges } from '../../modules/HelpCenter/PagesHelp/Exchanges';
import { FrequentDoubts } from '../../modules/HelpCenter/PagesHelp/FrequentDoubts';
import { HelpPaymentMethods } from '../../modules/HelpCenter/PagesHelp/HelpPaymentMethods';
import { OrdersAndDeliveries } from '../../modules/HelpCenter/PagesHelp/OrdersAndDeliveries';
import { PrivacyPolicy } from '../../modules/HelpCenter/PagesHelp/PrivacyPolicy';
import { TermsOfUse } from '../../modules/HelpCenter/PagesHelp/TermsOfUse';
import { Flow } from '../types/flow.type';

export const HelpCenterFLow: Flow[] = [
  {
    component: HelpCenter,
    name: 'HelpCenter',
  },
  {
    component: ClothingCare,
    name: 'ClothingCare',
  },
  {
    component: Exchanges,
    name: 'Exchanges',
  },
  {
    component: OrdersAndDeliveries,
    name: 'OrdersAndDeliveries',
  },
  {
    component: HelpPaymentMethods,
    name: 'HelpPaymentMethods',
  },
  {
    component: FrequentDoubts,
    name: 'FrequentDoubts',
  },
  {
    component: PrivacyPolicy,
    name: 'PrivacyPolicy',
  },
  // { component: TermsOfUse, name: 'TermsOfUse' },
  {
    component: ContactUs,
    name: 'ContactUs',
  },
];
