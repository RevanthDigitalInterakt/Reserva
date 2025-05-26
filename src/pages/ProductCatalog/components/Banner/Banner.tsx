import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useBannerCategoryLazyQuery } from '../../../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';

interface BannerProps {
  reference: string;
  setLoading: (loading: boolean) => void;
}

function Banner({ reference, setLoading }: BannerProps) {
  const [bannerImage, setBannerImage] = useState<string>('');
  const [getBannerCategory] = useBannerCategoryLazyQuery();
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  useEffect(() => {
    setLoading(true);
    getBannerCategory({
      context: { clientName: 'gateway' },
      fetchPolicy: getFetchPolicyPerKey('banner'),
      variables: {
        input: {
          category: reference,
        },
      },
    }).then(({ data }) => {
      if (data?.bannerCategory[0]?.image?.url) setBannerImage(data?.bannerCategory[0]?.image.url);
    }).finally(() => setLoading(true));
  }, [reference, getBannerCategory, getFetchPolicyPerKey, setLoading]);

  return (
    <View>
      {bannerImage ? <ImageComponent source={{ uri: bannerImage }} /> : <></> }
    </View>
  );
}
export default Banner;
