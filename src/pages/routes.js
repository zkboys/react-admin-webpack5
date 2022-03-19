import { getConventionalMenus } from '@ra-lib/util';
import pageConfig, { conventionalRoutes } from 'src/pages/page-configs';

// 无法获取title的菜单配置
const TITLE_MAP = {
    'system': '系统管理',
    'users': '用户管理2',
    'users/good-users': '优质用户管理',
};

// 约定菜单
export const menus = getConventionalMenus(pageConfig, conventionalRoutes, TITLE_MAP);

// 约定路由
export default [...conventionalRoutes];
