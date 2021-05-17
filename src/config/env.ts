const dev = {
  SENTRY_KEY:
    "https://d745bc385713420fb560e7c1602a14b1@o290903.ingest.sentry.io/5716450",
  ONE_SIGINAL_APP_KEY_IOS: "cf6780d3-1fb7-4b31-8c0b-eb96986a8ac6",
};

const production: typeof dev = {
  ...dev,
  ...{
    SENTRY_KEY:
      "https://72baed279d0b4c5883ee833ae67e8676@o290903.ingest.sentry.io/5736240",
    ONE_SIGINAL_APP_KEY_IOS: "cf6780d3-1fb7-4b31-8c0b-eb96986a8ac6",
  },
};

export const env = dev;
