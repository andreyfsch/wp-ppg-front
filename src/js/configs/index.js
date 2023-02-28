import * as apiConfig from './api-config.js';
import * as envConfig from './env-config.js';
import * as layoutConfig from './layout-config.js';

export default {
  ...apiConfig,
  ...envConfig,
  ...layoutConfig
};
