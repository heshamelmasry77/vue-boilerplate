const appConfig = require('./src/app.config')

module.exports = {
    configureWebpack: {
        // We provide the app's title in Webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: appConfig.title,
        // Set up all the aliases we use in our app.
        resolve: {
            alias: require('./aliases.config').webpack,
        },
    },
    productionSourceMap: false,
    css: {
        // Enable CSS source maps.
        sourceMap: true,
    },
    // Configure Webpack's dev server.
    // https://cli.vuejs.org/guide/cli-service.html
    devServer: {
        disableHostCheck: true,
        ...(process.env.API_BASE_URL ? // Proxy API endpoints to the production base URL.
            { proxy: { '/api': { target: process.env.API_BASE_URL } } } : // Proxy API endpoints a local mock API.
            { before: require('./tests/mock-api') }),
    },
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
}