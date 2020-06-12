const HtmlWebpackPlugin = require('html-webpack-plugin'),
      thisLink = (arr) => {
        let link = ''
        arr.forEach(v => {
            link += '<link rel="'
                + v.rel +
                '" href="'
                + v.href +
                '" '
                + (v.type !== undefined ? 'type="' + v.type + '"' : '')
                + (v.sizes !== undefined ? 'sizes="' + v.sizes + '"' : '') +
                '>'
        })
        return link
      }

module.exports = {
    productionSourceMap: false,
    configureWebpack: config => {
        config.plugins.forEach((val) => {
            if (val instanceof HtmlWebpackPlugin) {
                //标题
                val.options.title = process.env.VUE_APP_siteTitle

                val.options.meta = {
                    viewport: 'width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no',
                    'theme-color': '#e0e0e0'
                }

                val.options.link = thisLink([
                    { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
                    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
                    //{ rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/mdui@0.4.3/dist/css/mdui.min.css' }
                    { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto|Ubuntu:400,700' }
                ])
            }
        })
    }
}