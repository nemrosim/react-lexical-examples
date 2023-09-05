import path from 'path';

const config = {
   webpack: {
      alias: {
         '@/components': path.resolve(__dirname, 'src/components/'),
         '@/plugins': path.resolve(__dirname, 'src/plugins/'),
      },
   },
   jest: {
      configure: {
         moduleNameMapper: {
            '@/components(.*)$': '<rootDir>/src/components$1',
            '@/plugins(.*)$': '<rootDir>/src/plugins$1',
         },
      },
   },
};

export default config;
