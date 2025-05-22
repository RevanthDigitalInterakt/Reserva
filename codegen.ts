import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.ENVFILE || '.env' });

function getPrependAction(filepath: string) {
  return `printf '%s\n%s\n' "// @ts-nocheck\n/* eslint-disable */" "$(cat ${filepath})" > ${filepath}`;
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`${process.env.URL_GATEWAY_CLIENT}`]: {
        headers: {
          'x-api-key': process.env.API_KEY_GATEWAY!,
        },
      },
    },
  ],
  documents: './src/base/graphql/**/*.graphql',
  hooks: {
    beforeDone: [
      getPrependAction('./src/base/graphql/generated.ts'),
    ],
  },
  generates: {
    './src/base/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withRefetchFn: true,
      },
    },
  },
};

export default config;
