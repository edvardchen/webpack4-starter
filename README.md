## Fetures
+ `webpack` > 4
+ `prettier` + `eslint`(with `eslint-config-airbnb`)
+ `husky` + `lint-staged`to prevent bad commits
+ `scss` + `postcss`

## Real Long Term Caching
+ `webpack.NamedChunksPlugin` undocumented webapck plugin, to generate string `name` rather than numerical id for `chunk`
+ [webpack.HashedModuleIdsPlugin](https://webpack.js.org/plugins/hashed-module-ids-plugin/) do the same thing for `module`
