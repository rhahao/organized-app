module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  globals: {
    __dirname: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
      alias: {
        extensions: ['.js', '.jsx'],
        map: [
          ['@assets', './src/assets'],
          ['@constants', './src/constants'],
          ['@features', './src/features'],
          ['@hooks', './src/hooks'],
          ['@layouts', './src/layouts'],
          ['@pages', './src/pages'],
          ['@routes', './src/routes'],
          ['@services', './src/services'],
          ['@states', './src/states'],
          ['@utils', './src/utils'],
        ],
      },
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
