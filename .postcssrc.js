module.exports = ctx => {
  return {
    // parser: 'sugarss',
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {}
  };
};
