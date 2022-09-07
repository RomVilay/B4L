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
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ]
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
