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
  platform: 'Apple iPhone' | 'Android'
};

type TokenResponse = {
  data: {
    token: string;
  }
};
