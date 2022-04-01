module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  'plugins': [
    'import-glob',
    '@babel/plugin-syntax-dynamic-import',
    // 兼容配置
    [
      '@babel/plugin-transform-runtime',
      {
        'corejs': 3,
        'helpers': true,
        'regenerator': true,
        'useESModules': false,
      },
    ],
    // 按需加载  当ant design 为全局引入时需要注释
    // [
    //   'import',
    //   {
    //     libraryName: 'ant-design-vue',
    //     libraryDirectory: 'es',
    //     style: 'css'
    //   }
    // ]
  ]
}
