import { defineConfig } from '@umijs/max';
import { theme } from 'antd';

const { defaultAlgorithm, defaultSeed } = theme;
const { convertLegacyToken } = require('@ant-design/compatible/lib');
const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);

const { REACT_APP_ENV } = process.env;

const EVN_CONFIG = {
  dev: {
    imgUrl: 'https://test.yumcat.cn/images',
    apiUrl: '/webapi-dev',
  },
  pro: {
    imgUrl: 'https://images.yumcat.cn',
    apiUrl: '/webapi',
  },
  test: {
    imgUrl: 'https://test.yumcat.cn/images',
    apiUrl: '/webapi-test',
  },
};

export default defineConfig({
  qiankun: {
    slave: { enable: true },
  },
  routes: [{ path: '/', component: 'index' }],
  npmClient: 'pnpm',
  mfsu: false,
  lessLoader: {
    modifyVars: v4Token,
  },
  alias: {
    '@@service': '@/services',
  },
  antd: {},
  model: {},
  define: {
    SC_GLOBAL_API_URL: EVN_CONFIG[REACT_APP_ENV || 'dev'].apiUrl,
    SC_GLOBAL_IMG_URL: EVN_CONFIG[REACT_APP_ENV || 'dev'].imgUrl,
  },
  ignoreMomentLocale: true,
  extraBabelPlugins: [
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: '@scboson/sc-element',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string
      ) => {
        //  console.log(context.resourcePath)
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          // umi 的 global.less 约定不使用 css-module
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        return localName;
      },
    },
  },
});
