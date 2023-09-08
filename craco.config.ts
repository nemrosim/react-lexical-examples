import path from 'path';

const config = {
   webpack: {
      alias: {
         '@/components': path.resolve(__dirname, 'src/components/'),
         '@/utils': path.resolve(__dirname, 'src/utils/'),
         '@/plugins': path.resolve(__dirname, 'src/plugins/'),
         '@/nodes': path.resolve(__dirname, 'src/nodes/'),
      },
   },
   jest: {
      configure: {
         moduleNameMapper: {
            '@/components(.*)$': '<rootDir>/src/components$1',
            '@/plugins(.*)$': '<rootDir>/src/plugins$1',
            '@/utils(.*)$': '<rootDir>/src/utils$1',
            '@/nodes(.*)$': '<rootDir>/src/nodes$1',
         },
      },
   },
};

export default config;
