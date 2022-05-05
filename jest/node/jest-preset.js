module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          loose: false,
          keepClassNames: true,
          target: "es2021",
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: "commonjs",
        },
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  modulePathIgnorePatterns: ["<rootDir>/test/__fixtures__", "<rootDir>/node_modules", "<rootDir>/dist"],
};
