import { useCallback } from 'react';
import Config from 'react-native-config';
import { useRestAPI } from './useRestAPI';
import type { IResponseSendData } from '../types/interfaces/IResponseSendData';
import type { IResponseCouponShowModal } from '../types/interfaces/IResponseCouponShowModal';
import type { MasterDataSendDataDto } from '../types/dtos/masterdata-send-data.dto';

export interface IResponseSubmit {
  success: boolean;
  title: string;
  message?: string;
}

export default function useMasterdataProvider() {
  // TODO: Replace with useQuery
  const client = useRestAPI(Config.API_MASTERDATA_PROVIDER_URL!);

  const onCheckChristmasModalVisibility = useCallback(async (
  ): Promise<IResponseCouponShowModal> => {
    try {
      const { data } = await client.get<IResponseCouponShowModal>(`coupon/show-modal?version=${Date.now()}`);

      return data;
    } catch (err) {
      return {
        showModal: false, title: '', titleButton: '', subtitle: [], fineline: '',
      };
    }
  }, [client]);

  const onSendData = useCallback(async (dto: MasterDataSendDataDto): Promise<IResponseSubmit> => {
    try {
      const { data } = await client.post<IResponseSendData>(`coupon?version=${Date.now()}`, dto.toJson());

      return {
        success: true,
        title: 'Cupom criado com sucesso',
        message: data.message,
      };
    } catch (err) {
      return {
        success: false,
        title: err?.response?.data?.message || 'Ocorreu um erro!',
      };
    }
  }, [client]);

  return {
    onCheckChristmasModalVisibility,
    onSendData,
  };
}
