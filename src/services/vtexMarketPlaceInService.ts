import EventProvider from '../utils/EventProvider';
import type { IMktplacein } from '../modules/MarketplaceIn/components/MktPlaceName';
import { ServiceMakertPlaceIn } from '../config/AxiosConfig/MarketPlaceInService.config';

const getSellerInfos = async (sellerId: string): Promise<IMktplacein | undefined> => {
  try {
    const { data } = await ServiceMakertPlaceIn.get<Array<IMktplacein>>(`dataentities/MS/search?sellerId=${sellerId}&_fields=sellerId,texto,logo,bannerMobile,sellerName,linkApp`);
    if (data.length) {
      return data[0];
    }

    return undefined;
  } catch (error) {
    EventProvider.captureException(error);
    return undefined;
  }
};

export {
  getSellerInfos,
};
