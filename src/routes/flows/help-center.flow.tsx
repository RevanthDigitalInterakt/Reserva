import { HelpCenter } from "../../modules/HelpCenter/pages/HelpCenter";
import { Cashback } from "../../modules/HelpCenter/PagesHelp/Cashback";
import { ClothingCare } from "../../modules/HelpCenter/PagesHelp/ClothingCare";
import { Exchange } from "../../modules/HelpCenter/PagesHelp/Exchange";
import { FacaVc } from "../../modules/HelpCenter/PagesHelp/FacaVc";
import { FrequentDoubts } from "../../modules/HelpCenter/PagesHelp/FrequentDoubts";
import { Payment } from "../../modules/HelpCenter/PagesHelp/Payment";
import { Prime } from "../../modules/HelpCenter/PagesHelp/Prime";
import { PrivacyPolicy } from "../../modules/HelpCenter/PagesHelp/PrivacyPolicy";
import { Purchase } from "../../modules/HelpCenter/PagesHelp/Purchase";
import { Request } from "../../modules/HelpCenter/PagesHelp/Request";
import { Shipping } from "../../modules/HelpCenter/PagesHelp/Shipping";
import { Signup } from "../../modules/HelpCenter/PagesHelp/Signup";
import type { Flow } from "../types/flow.type";

export const HelpCenterFLow: Flow[] = [
  {
    component: HelpCenter,
    name: "HelpCenter",
  },
  {
    component: ClothingCare,
    name: "ClothingCare",
  },
  {
    component: Prime,
    name: "PrimeHelpInfo",
  },
  {
    component: Cashback,
    name: "CashbackHelpInfo",
  },
  {
    component: Signup,
    name: "SignupHelpInfo",
  },
  {
    component: Purchase,
    name: "PurchaseHelpInfo",
  },
  {
    component: Payment,
    name: "PaymentHelpInfo",
  },
  {
    component: Request,
    name: "RequestHelpInfo",
  },
  {
    component: Shipping,
    name: "ShippingHelpInfo",
  },
  {
    component: Exchange,
    name: "ExchangeHelpInfo",
  },
  {
    component: FacaVc,
    name: "FacaVcHelpInfo",
  },
  {
    component: FrequentDoubts,
    name: "FrequentDoubts",
  },
  {
    component: PrivacyPolicy,
    name: "PrivacyPolicy",
  },
];
