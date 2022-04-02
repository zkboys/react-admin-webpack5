import {toHome as _toHome, toLogin as _toLogin} from '@ra-lib/adm';
import {BASE_NAME, IS_SUB} from '../config';

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
