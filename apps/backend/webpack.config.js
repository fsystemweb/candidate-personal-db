const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config) => {
  config.mode = 'development';
  config.output = {
    ...config.output,
    libraryTarget: 'commonjs',
  };
  return config;
});