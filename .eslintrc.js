module.exports = {
    root: true,
    env: {
      'shared-node-browser': true,
      browser: true,
      node: true,
      "jest": true
    },
    extends: ['airbnb-base'],
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
      ecmaFeatures: {
        classes: true,
      },
    },
}