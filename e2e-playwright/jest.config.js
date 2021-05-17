module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    testMatch: ["./**/*.spec.ts"],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}