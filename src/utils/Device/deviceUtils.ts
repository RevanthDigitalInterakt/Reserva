import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const oneGigabyte = 1024 * 1024 * 1024;
const convertBytesToGigabytes = (bytes: number): string => (bytes / oneGigabyte).toFixed(2);

type DeviceInfoMemoryType = {
  totalMemory: string,
  usedMemory: string,
  freeMemory: string
};

type DeviceInfoStorageType = {
  totalStorage: string,
  usedStorage: string,
  freeStorage: string
};

type DeviceInfoModelType = {
  name: string,
  model: string,
  ip: string,
  os: string,
  version: string | number,
};

export const getDeviceInfoMemory = (): DeviceInfoMemoryType => {
  const totalMemory = DeviceInfo.getTotalMemorySync();
  const usedMemory = DeviceInfo.getUsedMemorySync();
  const freeMemory = totalMemory - usedMemory;

  return {
    totalMemory: convertBytesToGigabytes(totalMemory),
    usedMemory: convertBytesToGigabytes(usedMemory),
    freeMemory: convertBytesToGigabytes(freeMemory),
  };
};

export const getDeviceInfoStorage = (): DeviceInfoStorageType => {
  const totalStorage = DeviceInfo.getTotalDiskCapacitySync();
  const freeStorage = DeviceInfo.getFreeDiskStorageSync();
  const usedStorage = totalStorage - freeStorage;

  return {
    totalStorage: convertBytesToGigabytes(totalStorage),
    usedStorage: convertBytesToGigabytes(usedStorage),
    freeStorage: convertBytesToGigabytes(freeStorage),
  };
};

export const getDeviceInfoModel = (): DeviceInfoModelType => {
  const name = DeviceInfo.getDeviceNameSync();
  const model = DeviceInfo.getModel();
  const ip = DeviceInfo.getIpAddressSync();
  const os = Platform.OS;
  const version = Platform.Version;

  return {
    name,
    model,
    ip,
    os,
    version,
  };
};
