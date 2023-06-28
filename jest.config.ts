module.exports = {
    transformIgnorePatterns: [
      '/node_modules/(?!swiper|dom7)/',
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  