import React from 'react';
import {
  request,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const requestPermissionLocation = async () => {
  try {
    const lacationAlways = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    const lacationInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    const fineLoation = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (
      lacationAlways === 'granted' ||
      lacationInUse === 'granted' ||
      fineLoation === 'granted'
    ) {
      return true;
    }
  } catch (error) {}
};

export const checkPermissionLocation = async () => {
  try {
    const check = await checkMultiple([
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]);
    if (
      check['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted' ||
      check['ios.permission.LOCATION_ALWAYS'] === 'granted' ||
      check['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
    ) {
      return true;
    }
  } catch (err) {}
};
