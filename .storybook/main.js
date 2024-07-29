module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    // Modify or extend config here
    return config;
  },
};