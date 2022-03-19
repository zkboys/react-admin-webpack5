import storage from 'src/commons/storage';

const isIframe = window.self !== window.top;

// node环境
export const NODE_ENV = process.env.NODE_ENV;
// 实际运行环境，测试、预发布等环境时 NODE_ENV 也为 production，无法区分
export const RUN_ENV = process.env.REACT_APP_RUN_ENV || NODE_ENV;
// 是否显示却换代理组件
export const SHOW_PROXY = NODE_ENV === 'development' || window.location.hostname === '172.16.143.44';
// ajax 请求前缀 开发环境 或者 测试环境使用 localStorage中存储的前缀
export const AJAX_PREFIX = (SHOW_PROXY && storage.local.getItem('AJAX_PREFIX')) || '/api';
// ajax 超时时间
export const AJAX_TIMEOUT = 1000 * 60 * 60;
// 页面路由前缀
export const BASE_NAME = process.env.REACT_APP_BASE_NAME || '';
// 静态文件前缀
export const PUBLIC_URL = process.env.PUBLIC_URL || '';
// 是否作为微前端子项目，或者嵌入在iframe中
export const IS_SUB = process.env.REACT_APP_IS_SUB || isIframe;
