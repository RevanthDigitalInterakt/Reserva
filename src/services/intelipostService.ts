import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { asyncRequestHandler } from '../utils/asyncRequestHandler'

const _httpClient = axios.create({
  baseURL: 'https://lojausereserva.myvtex.com'
})

export type InvoiceKeyData = {
  estimated_delivery_date: number; // Unix timestamp em milissegundos
  estimated_delivery_date_formated: string; // Data formatada como string
  shipping_reference: string; // Referência do envio
  shipping_additional: string; // Informações adicionais do envio
  shipping_address: string; // Endereço de envio
  shipping_quarter: string; // Bairro de envio
  shipping_city: string; // Cidade de envio
  shipping_state: string; // Estado de envio
  shipment_order_volume_state: 'DELIVERED' | 'SHIPPED' | 'IN_TRANSIT' | 'PENDING' | string; // Estado do volume de envio
  provider_message: string; // Mensagem do provedor
  last_status_created: string; // Data da última atualização de status
}

export type TrackingNumberData = {
  tracking_url: string;
  estimated_delivery_date: number;
  estimated_delivery_date_formated: string;
  shipping_reference: string;
  shipping_address: string;
  shipping_quarter: string;
  shipping_city: string;
  shipping_state: string;
  shipping_additional: string;
  shipment_order_volume_state: string;
  provider_message: string;
  last_status_created: string;
};

export const fetchTrackingStatusByInvoiceKey = (key: string): Promise<AxiosResponse<InvoiceKeyData>> =>
  asyncRequestHandler(_httpClient.get(`/_v/getTrackingInvoice/${key}`))

export const fetchTrackingStatusByTrackingNumber = (key: string): Promise<AxiosResponse<TrackingNumberData>> =>
  asyncRequestHandler(_httpClient.get(`/_v/getTrackingNumber/${key}`))