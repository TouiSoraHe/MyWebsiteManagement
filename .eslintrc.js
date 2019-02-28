module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    "no-console": 0,
    "semi": 1,
    "brace-style": [
      2,
      "stroustrup",
      {
        "allowSingleLine": true
      }
    ],
    "camelcase": 2,
    "indent": 1,
    "comma-dangle": [
      1,
      "always"
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
