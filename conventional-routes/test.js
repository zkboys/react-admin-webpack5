const { getRoutes } = require('./index');
const path = require('path');
const { writeFileSync } = require('fs');

const root = path.join(__dirname, '..', 'src', 'pages');

const options = {
    componentPrefix: 'src/',
    root,
    config: {
        singular: true,
    },
};

const routes = getRoutes(options);
let routesStr = JSON.stringify(routes, null, 4);
const routesPath = path.join(__dirname, '..', 'src', 'pages', 'routes.js');
const comList = [];
let index = 0;
routesStr = routesStr.replace(/"component": "(.*)"/g, (str, $1) => {
    const Component = 'C' + index;
    index++;
    const componentPath = str.replace(`"component": `, '').replace(/"/g, '');
    comList.push({
        componentPath,
        Component,
    });
    return `"element": <${Component}/>`;
});
routesStr = routesStr.replace(/"routes":/g, 'children:');

writeFileSync(routesPath, `import React from 'react';

${comList.map(item => {
    const { componentPath, Component } = item;
    return `const ${Component} = React.lazy(() => import('${componentPath}'));`;
}).join('\n')}

export default ${routesStr}
`, 'UTF-8');

