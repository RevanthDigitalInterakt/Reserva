import React, { Fragment } from "react";
import { Typography } from "reserva-ui";

export interface MyWalletViewProps {

}

export const MyWalletView = (
  {}: MyWalletViewProps
) => {
  return (
    <Fragment>
      <Typography variant="tituloSessoes">
        My Wallet
      </Typography>
    </Fragment>
  );
}
