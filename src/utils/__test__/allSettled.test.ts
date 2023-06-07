import allSettled from '../allSettled';

describe('allSettled', () => {
  test('should return an array of fulfilled and rejected promises', async () => {
    const fulfilledPromise = Promise.resolve({ result: 'Fulfilled promise' });
    const rejectedPromise = Promise.reject(new Error('Rejected promise'));

    const promises = [fulfilledPromise, rejectedPromise];

    const result = await allSettled(promises);

    expect(result).toEqual([
      { result: 'Fulfilled promise', promise: 'fulfilled' },
      { promise: 'rejected' },
    ]);
  });
});
