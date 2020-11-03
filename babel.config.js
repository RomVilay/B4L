module.exports = {
  plugins: [
    [
      'dotenv-import',
      {
        allowUndefined: true,
        moduleName: '@env',
        path: '.env',
        safe: false,
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
