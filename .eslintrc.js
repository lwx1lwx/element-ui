// npm run lint 自动修改格式
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-undef': 'off',
    'no-sequences': 'off',
    'no-tabs': 'off',
    allowIndentationTabs: 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': 0,
  },
}
