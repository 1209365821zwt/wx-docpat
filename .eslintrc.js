module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "DEV": true,
    "WECHAT": true,
    "ALIPAY": true,
    "App": true,
    "Page": true,
    "Component": true,
    "Behavior": true,
    "wx": true,
    "getApp": true,
    "getCurrentPages": true,
    "module": true,
    "require": true
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "no-cond-assign": 2,
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "no-ex-assign": 2,
    "curly": [2, "all"],
    "no-label-var": 2,
    "no-unused-vars": [2, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    "no-multiple-empty-lines": [0, { "max": 50 }],
    "max-nested-callbacks": [2, 5],
    "max-statements-per-line": 0,
    "no-duplicate-imports": 2,
    "arrow-body-style": 2,
    "no-var": 1,
    "prefer-arrow-callback": 0,
    "no-extra-parens": 2,
    "no-extra-semi": 2,
    "no-trailing-spaces": 1
  }
};