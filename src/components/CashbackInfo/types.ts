export type InfoCashbackPdpOutput = {
  __typename?: string;
  infoCashback?: string | null;
  infoCashbackTextTooltip?: string | null;
  infoCashbackTitleTooltip?: string | null;
};

export type CashbackInfoProps = {
  data: {
    infoCashbackPdpCollection: InfoCashbackPdpOutput;
  };
};
