module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb', "prettier"],
  globals: {
    Atomics: 'readable',
    SharedArrayBuffer: 'readable',
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"]
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
      alias:{
        map: [
          [ "@pendingswap", "./src" ],
        ],
        extensions: ['.js','.jsx', '.json'],
      }
    },
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks'],
  rules: {
    semi: ['error', 'never'],
    'no-await-in-loop':'off',
    'no-restricted-syntax':'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'warn',
    'no-return-assign': 'off',
    'no-param-reassign':'off',
    'jsx-a11y/click-events-have-key-events':'off',
    'react/react-in-jsx-scope':'off',
    'no-eq-null': 'error',
    'no-underscore-dangle': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'no-mixed-operators': 'off',
    'no-nested-ternary': 'off',
    'object-curly-spacing': 'off',
    'linebreak-style': 'off',
    'no-unused-vars': 'off',
    'react/jsx-no-bind': 'off',
    "no-use-before-define": "off",
    'newline-per-chained-call': 'off',
    'array-element-newline': ['error', 'consistent'],
    "import/extensions":'off',
    'react/button-has-type':'off',
    'no-plusplus':'off',
    'no-shadow': 'warn',
    "react/jsx-props-no-spreading": "off",
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
      },
    ],
    camelcase: 'warn',
    'prefer-destructuring': 'warn',
    'arrow-body-style': 'warn',
    'object-curly-newline': ['warn', { consistent: true }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/forbid-prop-types': 'off',
    'react/sort-comp': 'off',
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-max-props-per-line': [1, { maximum: 1 }],
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off', // props validation by typescript
    'no-confusing-arrow': 0,
    'react/destructuring-assignment': 'off',
    'react/jsx-wrap-multilines': 'off',
    'space-infix-ops': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Disabled by duplicated with prettier setting
    quotes: 'off',
    'jsx-quotes': 'off',
    'comma-dangle': 'off',
    'max-len': 'off',
    'arrow-parens': 'off',

    // fix typescript syntax error
    'no-useless-constructor': 'off',
  },
}
