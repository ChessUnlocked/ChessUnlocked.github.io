export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        window: true,
        document: true,
        console: true,
        process: true,
        __APP_VERSION__: true,
        __BUILD_DATE__: true
      }
    },
    rules: {
      // Code quality
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'warn',
      
      // Best practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'dot-notation': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      
      // ES6+
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'template-curly-spacing': 'error',
      
      // Styling
      'indent': ['error', 2],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'max-len': ['warn', { code: 100, ignoreUrls: true }],
      
      // Functions
      'max-params': ['warn', 4],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      
      // Complexity
      'complexity': ['warn', 10],
      'max-depth': ['warn', 4],
      'max-nested-callbacks': ['warn', 3]
    }
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        describe: true,
        it: true,
        test: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        vi: true,
        vitest: true
      }
    },
    rules: {
      'no-console': 'off',
      'max-lines-per-function': 'off'
    }
  }
];