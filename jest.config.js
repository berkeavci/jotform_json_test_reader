module.exports = {
    "preset": "jest-puppeteer",
    globals: {
        URL: [
            "https://www.jotform.com/"
        ]
      },
    verbose: true,
    setupFilesAfterEnv:['./json.test.js']
};