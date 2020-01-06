// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // extend提供的是eslint现有规则的一系列预设
  // 而plugin则提供了除预设之外的自定义规则，当你在eslint的规则里找不到合适的的时候
  // 就可以借用插件来实现了
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  // eslint：代码检测工具；可以检测出你代码中潜在的问题
  // prettier： 代码格式化工具；作为代码格式化工具，能够统一你或者你的团队的代码风格
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 配置代码格式化规则
    'prettier/prettier': 'error'
  }
}
