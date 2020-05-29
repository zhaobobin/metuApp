module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/api': './src/api',
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/models': './src/models',
          '@/navigator': './src/navigator',
          '@/pages': './src/pages',
          '@/utils': './src/utils'
        }
      }
    ]
  ]
};
