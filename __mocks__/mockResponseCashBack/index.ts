export const mockResponseCashBack = ({
  cashback: {
    wallet: {
      balanceInCents: 50,
      pendingBalanceInCents: 990,
      balanceExpiresOn: null,
      userStatus: 'active',
    },
    expiration: {
      cashbackToExpire: [
        {
          expireCashbackAmount: 50,
          expireDays: 8,
          expireAt: '2024-05-15T19:32:13.740Z',
          expireCashbackProgramRefId: null,
          expireOperationId: null,
          expireStatus: 'toExpire',
          expireOrderId: 'incentivo',
        },
      ],
      totalExpireBalanceInCents: 0,
    },
    operations: [
      {
        type: 'credit',
        status: 'available',
        externalOrderId: 'incentivo',
        externalOrderAmountInCents: 0,
        cashbackAmountInCents: 50,
        appliedBalanceInCents: 0,
        currentBalanceInCents: 0,
        settlementDate: '2024-04-15T19:32:13.740Z',
        createdAt: '2024-04-15T19:32:13.740Z',
      },
      {
        type: 'credit',
        status: 'pending',
        externalOrderId: '1341204170779-01',
        externalOrderAmountInCents: 0,
        cashbackAmountInCents: 9.9,
        appliedBalanceInCents: 0,
        currentBalanceInCents: 0,
        settlementDate: '2023-06-22T15:40:59.020Z',
        createdAt: '2023-06-21T15:40:59.020Z',
      },
    ],
  },
});
