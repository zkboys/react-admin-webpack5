const { createProxyMiddleware } = require('http-proxy-middleware');
const proxies = require('./setupProxyConfig.json');
const path = require('path');
const fs = require('fs');

module.exports = function (app) {
    proxies.forEach((item) => {
        const { baseUrl, target } = item;
        app.use(
            createProxyMiddleware(baseUrl, {
                target,
                pathRewrite: { [`^${baseUrl}`]: '' },
                changeOrigin: true,
                secure: false, // 是否验证证书
                ws: true, // 启用websocket
            })
        );
    });

    // 门户代理
    app.use(
        createProxyMiddleware('/portal', {
            // target: 'http://172.16.143.44:32328', // 老测试门户后端
            target: 'http://22.50.7.25:39945', // 测试门户后端
            // target: 'http://22.50.7.25:3411', // 杰汇门户后端
            pathRewrite: {
                '^/portal': '',
            },
            changeOrigin: true,
            secure: false, // 是否验证证书
            ws: true, // 启用websocket
        })
    );
};

(function modifyTestNg() {
    const ngConfigPath = path.resolve(__dirname, '..', 'deploy', 'rancher', 'nginx.conf');
    const ngConfig = fs.readFileSync(ngConfigPath, 'UTF-8');
    const locations = proxies
        .filter((item) => !item.disabled)
        .map(({ name, baseUrl, target }) => {
            return `
    # 代理ajax请求 ${name}
    location ^~${baseUrl} {
        rewrite ^${baseUrl}/(.*)$ /$1 break; # 如果后端接口不是统一以api开头，去掉api前缀
        proxy_pass ${target};
        proxy_read_timeout 1200;  # 秒 代理超时时间
        proxy_set_header Host  $http_host;
        proxy_set_header Connection close;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Server $host;
    }
        `;
        })
        .join('');
    const startIndex = ngConfig.indexOf('# 代理ajax请求');

    const nextNgConfig = `
${ngConfig.substring(0, startIndex)}${locations.trim()}
}
    `;
    fs.writeFileSync(ngConfigPath, nextNgConfig.trim(), 'UTF-8');
})();
