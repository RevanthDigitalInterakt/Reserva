// create a react context to cache images


import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import RNFetchBlob from 'rn-fetch-blob'
interface CacheImage {
  uri: string;
  path: string;
}

interface Cache {
  images: CacheImage[];
  size: number;
}

const CacheImagesContext = createContext<{
  fetchImage: (url: string) => Promise<string>
}>({
  fetchImage: () => Promise.resolve(''),
});

export const CacheImagesProvider = ({ children }: { children: React.ReactNode }) => {
  const MaxCacheSize = 1024 * 1024 * 99999; //
  const [cache, setCache] = useState<Cache>({
    images: [],
    size: 0
  });

  const saveCache = async () => {
    const cacheString = JSON.stringify(cache);
    AsyncStorage.setItem('@cacheImages', cacheString);
  }

  const loadCache = async () => {
    const cacheString = await AsyncStorage.getItem('@cacheImages');
    if (cacheString) {
      const cache = JSON.parse(cacheString);
      setCache(cache);
    }
  }


  const controlCacheSize = async () => {
    // check if cache size is bigger than max cache size and remove images from end of cache until it is smaller
    if (cache.size > MaxCacheSize) {
      cache.images.reverse().forEach(async image => {
        const imageSize = await getImageSize(image.path);
        const sizeWhenRemoved = cache.size - (imageSize * 1024);
        if (sizeWhenRemoved < MaxCacheSize) {
          removeImageFromCache(image.uri);
        }
      })
    }
  }

  const getImageSize = async (path: string) => {
    const stat = await RNFetchBlob.fs.stat(path);
    // console.log('getImageSize', stat.size)
    return Number(stat.size) / 1024; // size in KB
  }

  const addImageToCache = async (url: string, path: string) => {
    const size = await getImageSize(path);

    setCache(prev => {
      if (!prev) return {
        images: [{
          uri: url,
          path: `file://${path}`
        }], size
      };

      const newCache = {
        images: [
          {
            uri: url,
            path: `file://${path}`
          },
          ...prev.images
        ],
        size: prev.size + size
      };
      return newCache;
    })
  };

  const removeImageFromCache = async (url: string) => {
    const path = cache.images.find(x => x.uri === url)?.path || '';
    const size = await getImageSize(path);

    setCache(prev => {
      if (!prev) return { images: [], size: 0 };

      const newCache = {
        images: prev.images.filter(image => image.uri !== url),
        size: prev.size - size
      };
      return newCache;
    })
  };

  const reorderCache = (lastUriAccessed: string) => {
    const index = cache.images.findIndex(x => x.uri === lastUriAccessed);
    if (index > -1) {
      const image = cache.images.splice(index, 1)[0];
      cache.images.unshift(image);
    }
  }

  const fetchImage = async (url: string) => {
    const cachedImage = cache.images.find(image => image.uri === url);
    if (cachedImage) {
      // console.log('image already cached');
      reorderCache(url);
      return cachedImage.path;
    } else {
      const res = await RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', url)

      // console.log('image downloaded', res.path());
      addImageToCache(url, `${res.path()}`);
      return `file://${res.path()}`;

    }
  }

  useEffect(() => {
    // console.log('cache images context loaded');
    loadCache();
  }, []);

  useEffect(() => {
    saveCache();
    controlCacheSize();
    // console.log('cache images context saved');
    // console.log('cache images context size', cache.size);
    // console.log('cache images context images', cache.images.length);
  }, [cache]);

  return (
    <CacheImagesContext.Provider value={{ fetchImage }}>
      {children}
    </CacheImagesContext.Provider>
  );
};

export const useCacheImages = () => useContext(CacheImagesContext);
