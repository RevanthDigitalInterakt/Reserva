import configDeviceSizes from './configDeviceSizes';

const guidelineBaseWidth = 320;

export const scale = (size: number = 0) => (
  (configDeviceSizes.DEVICE_WIDTH / guidelineBaseWidth) * size
);
