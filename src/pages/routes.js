import pageConfig, { conventionalRoutes } from 'src/pages/page-configs';

const TITLE_MAP = {
    _system: '系统管理',
    _users: '用户管理2',
};

export const menus = getConventionalMenus(pageConfig, conventionalRoutes, TITLE_MAP);

export default [
    ...conventionalRoutes,
];

/**
 * 获取约定菜单
 * @param pageConfig 页面配置 config高级组件参数
 * @param conventionalRoutes 获取到的约定路由
 * @param TITLE_MAP 未命名路由映射
 * @returns {*[]|*}
 */
function getConventionalMenus(pageConfig, conventionalRoutes, TITLE_MAP) {
    const hasTitle = pageConfig.filter(item => item.title);

    const _menus = [];
    const __menus = [];
    if (hasTitle?.length) {
        const loop = nodes => nodes.forEach(node => {
            const menu = hasTitle.find(item => item.filePath === node.absComponent);
            if (menu) {
                const id = node.path.replace(/\W/g, '_');
                const paths = node.path.split('/');
                paths.pop();
                const parentId = paths.join('/').replace(/\W/g, '_');

                _menus.push({
                    id,
                    parentId,
                    title: menu.title,
                    parentTitle: menu.parentTitle,
                    path: node.path,
                    filePath: menu.filePath,
                });
            }
            if (node.children) {
                loop(node.children);
            }
        });

        loop(conventionalRoutes);

        _menus.forEach(item => {
            const { id, parentId, title, path, parentTitle, filePath } = item;

            // 添加缺少的父级菜单
            if (
                parentId
                && !_menus.some(it => it.id === parentId)
                && !__menus.some(it => it.id === parentId)
            ) {
                __menus.push({
                    id: parentId,
                    title: TITLE_MAP[parentId] || parentId,
                });
            }

            // 要作为父级
            const asParent = _menus.some(it => it.parentId === id);
            if (!asParent) {
                __menus.push(item);
                return;
            }

            // 添加一个父级
            __menus.push({
                id,
                parentId,
                title: parentTitle || TITLE_MAP[id] || id,
            });

            // 当前菜单作为子菜单
            __menus.push({
                id: `${id}_index`,
                parentId: id,
                title,
                path,
                filePath,
            });
        });
    }

    return convertToTree(__menus);
}

/**
 * 转换为树状结构
 * @param rows
 * @param keyField
 * @param parentKeyField
 * @returns {*[]|*}
 */
export function convertToTree(rows, keyField = 'id', parentKeyField = 'parentId') {
    if (!rows) return [];

    // 拷贝，多次执行修改原始的rows会出问题，指定id，parentId
    // eslint-disable-next-line no-param-reassign
    rows = rows.map(item => ({ id: item[keyField], parentId: item[parentKeyField], ...item }));

    // 获取所有的顶级节点
    let nodes = rows.filter(item => !rows.find(r => r.id === item.parentId));

    // 存放要处理的节点
    let toDo = [...nodes];

    while (toDo.length) {
        // 处理一个，头部弹出一个。
        let node = toDo.shift();
        // 获取子节点。
        rows.forEach(child => {
            if (child.parentId === node.id) {

                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                // child加入toDo，继续处理
                toDo.push(child);
            }
        });
    }
    return nodes;
}
