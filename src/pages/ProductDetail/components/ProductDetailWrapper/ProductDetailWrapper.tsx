import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { platformType } from '../../../../utils/platformType';
import { TopBarDefaultBackButton } from '../../../../modules/Menu/components/TopBarDefaultBackButton';
import { Box } from '../../../../components/Box/Box';

interface IProductDetailWrapper {
  children: React.ReactNode;
  loading: boolean;
}

function ProductDetailWrapper({ children, loading }: IProductDetailWrapper) {
  return (
    <SafeAreaView>
      <Box bg="white">
        <TopBarDefaultBackButton loading={loading} navigateGoBack />

        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === platformType.IOS ? 'padding' : undefined}
          style={{ marginBottom: 160 }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={{ marginBottom: 24 }}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </SafeAreaView>
  );
}

export default ProductDetailWrapper;
