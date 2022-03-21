import { getConventionalMenus } from '@ra-lib/adm';
import pageConfig, { conventionalRoutes } from 'src/pages/page-configs';

// 无法获取title的菜单配置
const TITLE_MAP = {
    'system': '系统管理',
};

// 约定菜单
export default getConventionalMenus(pageConfig, conventionalRoutes, TITLE_MAP);
