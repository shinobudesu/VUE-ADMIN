const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            less: {
                globalVars: {}
            },
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 14, // 换算的基数
                        propList: ['*'],
                    }),
                ]
                // 这里的选项会传递给 postcss-loader
            }
        }
    },
    devServer: {
        // proxy: {
        //     '/api': {
        //         target: '',
        //         ws: true,
        //         changeOrigin: true
        //     }
        // }
        proxy: "http://localhost:8080"
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"));
        config
            .entry('index')
            .add('babel-polyfill');
        config.module.rule('fonts').use('url-loader').tap(options => {
            options.test = /\.(eot|svg|ttf|woff|woff2?)$/
            return options;
        });
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    }
}