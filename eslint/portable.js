module.exports = {
  extends: require.resolve("./base.js"),
  plugins: ["es"],
  rules: {
    // lookbehinds break in safari because apple is trying hard
    // to recreate the internet explorer experience.
    "es/no-regexp-lookbehind-assertions": "error",
  },
};
