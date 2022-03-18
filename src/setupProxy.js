const { createProxyMiddleware } = require('http-proxy-middleware');

const proxies = [
    {
        name: '测试环境',
        baseUrl: '/api',
        target: 'http://172.16.170.17:8080',
    },
];

module.exports = function(app) {
    proxies.forEach(item => {
        const { baseUrl, target } = item;
        app.use(createProxyMiddleware(baseUrl, {
            target,
            // pathRewrite: { '^/api': '' },
            changeOrigin: true,
            secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }));
    });
};
