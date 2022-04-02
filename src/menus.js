import {getConventionalMenus} from '@ra-lib/adm';
import pageConfig, {conventionalRoutes} from 'src/pages/page-configs';

// 父级目录无title，可以通过parentTitle指定
// 无法获取title的菜单配置
const TITLE_MAP = {
    'system': '系统管理',
};

// 约定菜单：config高阶组件中需要配置title属性，否则不生成菜单；
export default getConventionalMenus(pageConfig, conventionalRoutes, TITLE_MAP);
