import pageConfig, { conventionalRoutes } from 'src/pages/page-configs';

const hasTitle = pageConfig.filter(item => item.title);


// TODO 如何基于文件结构，做出菜单层级结构
const _menus = [];
if (hasTitle?.length) {
    const loop = nodes => nodes.forEach(node => {
        const menu = hasTitle.find(item => item.filePath === node.absComponent);
        if (menu) {
            _menus.push({
                key: menu.filePath.replace(/\W/g, '_'),
                title: menu.title,
                path: node.path,
            });
        }
        if (node.children) {
            loop(node.children);
        }
    });

    loop(conventionalRoutes);
}

export const menus = _menus;

export default [
    ...conventionalRoutes,
];
