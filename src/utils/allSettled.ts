export default (promises: Promise<any>[]) => Promise.all(
  promises.map((promise: Promise<any>) => promise
    .then((value) => ({ ...value, ...{ promise: 'fulfilled' } }))
    .catch((_reason) => ({ promise: 'rejected' }))),
);
