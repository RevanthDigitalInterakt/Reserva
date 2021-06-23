import vtexConfig from "../config/vtexConfig";

const CreateCart = async () => {
  const response = await vtexConfig.get(`/checkout/pub/orderForm/?sc=7`);
  return response;
};

export default {
  CreateCart,
};
