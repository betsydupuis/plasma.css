/* Define Gulp Configs*/

module.exports = {
    isProd: false,
    browserify: {
        bundleName: 'dependencies.entry.js',
        prodSourcemap: false
    },

    host: {
        domain: 'localhost.accend.io',
        port: 3000
    },

};