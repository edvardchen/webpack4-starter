module.exports = ({ env }) => {
  const DEV = env === 'development';
  return {
    // parser: 'sugarss',
    map: false,
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {},
      autoprefixer: DEV ? false : {},
      cssnano: DEV ? false : {}
    }
  };
};
