export const getHomeContent = (
  data: any[],
  userGeolocation: string,
) => {
  const newData = data.filter((x) => x.bannerLocation?.toString() === userGeolocation);

  if (newData.length > 0) {
    return data;
  }

  return data.filter((x) => x.bannerLocation?.length === 0);
};
