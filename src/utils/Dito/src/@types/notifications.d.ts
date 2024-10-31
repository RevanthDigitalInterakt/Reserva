type NotificationRequest = {
  id: string;
  data: {
    identifier: string;
    reference: string
  };
};

type NotificationResponse = {
  data: Array<any>;
};

type TokenRequest = {
  id: string;
  token: string;
  platform: string;
};

type TokenResponse = {
  data: {
    token: string;
  }
};
