module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "/*.config.js",
    "pre-render.js",
    ".eslintrc.cjs",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:import/typescript",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
  plugins: ["react", "import"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "import/newline-after-import": ["error", { count: 1 }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
