const { createConfig, getDependencies } = require("eslint-config-galex/src/createConfig");
const { createTSOverride } = require("eslint-config-galex/src/overrides/typescript");
const { createJestOverride } = require("eslint-config-galex/src/overrides/jest");
const packageJson = require(process.cwd() + "/package.json");
const { writeFileSync } = require("fs");

writeFileSync("out", process.cwd());
if (!packageJson.devDependencies.typescript) {
  throw new Error('"typescript" must be in the "devDependencies" section of package.json');
}

const mergedDeps = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

module.exports = createConfig({
  rules: {
    curly: "off",
    "import/order": "off",
    "prefer-destructuring": "off",
    "no-bitwise": "off",
    "unicorn/numeric-separators-style": "off",
    "prefer-template": "off",
    "object-shorthand": "off",
    "no-param-reassign": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/no-unsafe-regex": "off",
    "unicorn/prefer-json-parse-buffer": "off",
    "promise/prefer-await-to-then": "off",
    "require-atomic-updates": "off",
    "unicorn/no-static-only-class": "off",
    "sonarjs/no-identical-expressions": "off",
    "import/no-namespace": "off",
    "sonarjs/elseif-without-else": "off",
    "sonarjs/max-switch-cases": "off",
    "sonarjs/no-nested-switch": "off",
    "sonarjs/no-small-switch": "off",
    "promise/prefer-await-to-callbacks": "off",
    "no-console": "off",
    "prefer-object-has-own": "off",
    "no-await-in-loop": "off",
    "new-cap": "off",
    "no-empty": "off",
    "no-eq-null": "off",
    eqeqeq: "off",
  },
  overrides: [
    createTSOverride({
      hasNest: !!mergedDeps["@nestjs/core"],
      typescript: {
        hasTypeScript: !!mergedDeps.typescript,
        version: mergedDeps.typescript,
      },
      react: {
        hasReact: !!mergedDeps.react,
        isNext: !!mergedDeps.next,
        isPreact: !!mergedDeps.preact,
      },
      rules: {
        "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/prefer-literal-enum-member": "off",
        "@typescript-eslint/prefer-enum-initializers": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-loop-func": "off",
        "@typescript-eslint/no-invalid-void-type": "off",
        "@typescript-eslint/switch-exhaustiveness-check": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/no-unnecessary-type-arguments": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/unified-signatures": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          {
            accessibility: "no-public",
          },
        ],
      },
    }),
    createJestOverride({
      ...getDependencies(),
      hasJestDom: !!mergedDeps["@testing-library/jest-dom`"],
      hasJest: !!mergedDeps.jest,
      hasTestingLibrary: !!mergedDeps["@testing-library/react"],
      rules: {
        "jest/prefer-strict-equal": "off",
        "jest-formatting/padding-around-all": "off",
        "jest/prefer-called-with": "off",
        "jest/require-top-level-describe": "off",
      },
    }),
    {
      files: ["**/*.{structure,manager}.ts"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                // logger instances prevent classes being garbage collected, causing very unpoggers memory leaks.
                // ref: https://discord.com/channels/340583394192916492/532902669220839426/960760914775248926
                name: "@sylo-digital/logging",
                importNames: ["Logger", "NestLogger"],
                message: `Do not use loggers in managers or structures. Using the logger on managers or structures can cause extreme memory leaks leading to crashes.`,
              },
            ],
          },
        ],
      },
    },
  ],
});
