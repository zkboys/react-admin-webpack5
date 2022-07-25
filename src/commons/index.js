import { toHome as _toHome, toLogin as _toLogin } from '@ra-lib/adm';
import { BASE_NAME, IS_SUB } from '../config';
import pageConfigs from 'src/pages/page-configs';
import {match} from 'path-to-regexp';
import routes from 'src/routes';

/**
 * 进入首页
 */
export function toHome() {
    return _toHome(BASE_NAME);
}

/**
 * 跳转到登录页面
 */
export function toLogin() {
    return _toLogin(IS_SUB, BASE_NAME);
}


/**
 * 基于 window.location.pathname pageConfig 获取当前页面config高级组件参数
 * @returns {{}|*}
 */
export function getCurrentPageConfig() {
    let { pathname } = window.location;
    if (BASE_NAME) {
        pathname = pathname.replace(BASE_NAME, '');
    }

    const route = routes.find(({ path }) => path && match(path, { decode: decodeURIComponent })(pathname));

    return pageConfigs.find(item => item.filePath === route?.absComponent) || {};
}
