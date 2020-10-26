/*const path = require('path')

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    },
}

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/imports.styl'),
            ],
        })
}*/

module.exports = {
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            css: {
                // Примечание: формат конфигурации отличается между Vue CLI v4 и v3
                // Для пользователей Vue CLI v3, обратитесь к документации css-loader v1
                // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
                modules: {
                    localIdentName: '[name]-[hash]'
                },
                localsConvention: 'camelCaseOnly'
            }
        }
    }
}