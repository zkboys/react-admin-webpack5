import {getSubAppConfig} from '@ra-lib/adm';

const { isIframe, isMicro, baseName, ajaxFullPrefix } = getSubAppConfig();

// 应用名称
export const APP_NAME = '管理系统架构';
// node环境
export const NODE_ENV = process.env.NODE_ENV;
// 实际运行环境，测试、预发布等环境时 NODE_ENV 也为 production，无法区分
export const RUN_ENV = process.env.REACT_APP_RUN_ENV || NODE_ENV;
// 是否是开发环境
export const IS_DEV = RUN_ENV === 'development';
// 是否是生产环境
export const IS_PROD = RUN_ENV === 'production';
// 是否是测试环境
export const IS_TEST = RUN_ENV === 'test';
// 是否是预览
export const IS_PREVIEW = RUN_ENV === 'preview';
// 是否作为微前端子项目，或者嵌入在iframe中
export const IS_SUB = process.env.REACT_APP_IS_SUB || isIframe || isMicro;
// 是否显示切换代理组件
export const SHOW_PROXY = !IS_SUB && (NODE_ENV === 'development' || RUN_ENV === 'test');
// 作为子应用时，拼接完整路径，如果同源，基于name做代理区分
export const AJAX_FULL_PREFIX = IS_SUB ? ajaxFullPrefix : '';
// ajax 请求前缀 开发环境 或者 测试环境使用 localStorage中存储的前缀
export const AJAX_PREFIX = process.env.REACT_APP_AJAX_PREFIX || (SHOW_PROXY && window.localStorage.getItem('AJAX_PREFIX')) || '/api';
// ajax 超时时间
export const AJAX_TIMEOUT = process.env.REACT_APP_AJAX_TIMEOUT || 1000 * 60 * 60;
// 页面路由前缀
export const BASE_NAME = process.env.REACT_APP_BASE_NAME || baseName || '';
// 页面保持
export const KEEP_PAGE_ALIVE = false; //!!(process.env.REACT_APP_KEEP_PAGE_ALIVE || IS_SUB);
// 静态文件前缀
export const PUBLIC_URL = process.env.PUBLIC_URL || '';
// 是否忽略权限
export const IGNORE_PERMISSION = IS_PROD ? false : false;
