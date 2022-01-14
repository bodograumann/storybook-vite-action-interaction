module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  "framework": "@storybook/vue3",
  core: {
    builder: "storybook-builder-vite"
  },
  async viteFinal(config, { configType }) {
    // https://github.com/eirslett/storybook-builder-vite/issues/186#issuecomment-1001064670
    if (configType !== "PRODUCTION") {
      config.optimizeDeps ??= { include: [] };
      config.optimizeDeps.include.push(
        // Fix: `@storybook/addon-interactions` exports is not defined or `jest-mock` does not provide an export named "fn"
        "jest-mock",
      );
    }
    return config;
  }
}