import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const convertBytesToGb = (bytes: number): string => (bytes / (1024 * 1024 * 1024)).toFixed(2);

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
  so: string,
  version: string | number,
};

export const getDeviceInfoMemory = (): DeviceInfoMemoryType => {
  const totalMemory = DeviceInfo.getTotalMemorySync();
  const usedMemory = DeviceInfo.getUsedMemorySync();
  const freeMemory = totalMemory - usedMemory;

  return {
    totalMemory: convertBytesToGb(totalMemory),
    usedMemory: convertBytesToGb(usedMemory),
    freeMemory: convertBytesToGb(freeMemory),
  };
};

export const getDeviceInfoStorage = (): DeviceInfoStorageType => {
  const totalStorage = DeviceInfo.getTotalDiskCapacitySync();
  const freeStorage = DeviceInfo.getFreeDiskStorageSync();
  const usedStorage = totalStorage - freeStorage;

  return {
    totalStorage: convertBytesToGb(totalStorage),
    usedStorage: convertBytesToGb(usedStorage),
    freeStorage: convertBytesToGb(freeStorage),
  };
};

export const getDeviceInfoModel = (): DeviceInfoModelType => {
  const name = DeviceInfo.getDeviceNameSync();
  const model = DeviceInfo.getModel();
  const ip = DeviceInfo.getIpAddressSync();
  const so = Platform.OS;
  const version = Platform.Version;

  return {
    name,
    model,
    ip,
    so,
    version,
  };
};
