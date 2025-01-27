import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { trackEventDitoStatusCart } from './trackEventDitoStatusCart';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import { mergeItemsPackage } from './mergeItemsPackage';

export const has24HoursPassed = async (key: string) => {
  try {
    const lastEventDate = await AsyncStorage.getItem(key);
    if (!lastEventDate) {
      return true;
    }

    const lastEventTimestamp = new Date(lastEventDate).getTime();
    const currentTimestamp = new Date().getTime();

    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
    return currentTimestamp - lastEventTimestamp >= twentyFourHoursInMs;
  } catch (error) {
    ExceptionProvider.captureException(error, "has24HoursPassed - useOncePerDayEvent.ts");
    return false;
  }
};

export const useOncePerDayEvent = (eventKey: string) => {
  const [canTriggerEvent, setCanTriggerEvent] = useState<boolean>(false);

  const {
    clientProfileData,
    packageItems,
    appTotalizers,
  } = useBagStore(['clientProfileData', 'appTotalizers', 'packageItems']);

  useEffect(() => {
    const checkEventStatus = async () => {
      const canTrigger = await has24HoursPassed(eventKey);
      setCanTriggerEvent(canTrigger);
    };

    checkEventStatus();
  }, [eventKey]);

  const triggerEvent = async () => {
    if (canTriggerEvent) {
      try {
        await trackEventDitoStatusCart({
          items: mergeItemsPackage(packageItems),
          appTotalizers,
          clientProfileData,
        });
        await AsyncStorage.setItem(eventKey, new Date().toISOString());
      } catch (error) {
        ExceptionProvider.captureException(error, "triggerEvent - useOncePerDayEvent.ts");
      }
    }
  };

  return {
    canTriggerEvent,
    setCanTriggerEvent,
    triggerEvent,
  };
};
