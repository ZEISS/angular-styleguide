module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    testMatch: ["./**/*.e2e.ts"],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        __BASE_URL__: "http://localhost:4200/"
    }
}