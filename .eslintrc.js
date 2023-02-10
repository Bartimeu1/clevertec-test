module.exports = {
    extends: [require.resolve('arui-presets-lint/eslint'), 'plugin:react/jsx-runtime'],
    parserOptions: {
        project: ['./tsconfig.eslint.json',/* './cypress/tsconfig.json' */],
    },

    overrides: [
        {
            files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                // TODO: добавить после cypess 'cypress/**/*.ts',
                devDependencies: true,
            },
        ],
        'import/no-default-export': 'error',
        indent: 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^action' }],
        "no-nested-ternary": "off",
        "no-unneeded-ternary": "off"
    },
    ignorePatterns: ['coverage', 'cypress.config.ts'],
};
