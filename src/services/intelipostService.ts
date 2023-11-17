import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { asyncRequestHandler } from '../utils/asyncRequestHandler';

const httpClient = axios.create({
  baseURL: 'https://lojausereserva.myvtex.com',
});

export type InvoiceKeyData = {
  estimated_delivery_date: number;
  estimated_delivery_date_formated: string;
  shipping_reference: string;
  shipping_additional: string;
  shipping_address: string;
  shipping_quarter: string;
  shipping_city: string;
  shipping_state: string;
  shipment_order_volume_state: 'DELIVERED' | 'SHIPPED' | 'IN_TRANSIT' | 'PENDING' | string;
  provider_message: string;
  last_status_created: string;
};

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

export const fetchTrackingStatusByInvoiceKey = (key: string): Promise<AxiosResponse<InvoiceKeyData>> => asyncRequestHandler(httpClient.get(`/_v/getTrackingInvoice/${key}`));

export const fetchTrackingStatusByTrackingNumber = (key: string): Promise<AxiosResponse<TrackingNumberData>> => asyncRequestHandler(httpClient.get(`/_v/getTrackingNumber/${key}`));
