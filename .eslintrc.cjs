/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/multi-word-component-names": "off", // 关闭组件多单词命名
    "no-console": process.env.NODE_ENV === "production" ? "off" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "warn",
    eqeqeq: "warn"
  }
};
