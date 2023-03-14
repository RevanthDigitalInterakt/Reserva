declare type AssociateAccountRequest = {
  id: string;
  accounts: {
    portal: {
      id: string;
    }
  }
};

declare type AssociateAccountResponse = {
  string: {
    message: string;
  }
};

declare type DisassociateAccountRequest = AssociateAccountRequest;
declare type DisassociateAccountResponse = AssociateAccountResponse;
