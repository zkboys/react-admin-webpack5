import { Ajax, createAjaxHooks as createHooks, createAjaxHoc as createHoc, getToken, handleError, handleSuccess } from '@ra-lib/adm';
import { AJAX_PREFIX, AJAX_FULL_PREFIX, AJAX_TIMEOUT } from 'src/config';
import { toLogin } from './index';

// 创建Ajax实例，设置默认值
const ajax = new Ajax({
    baseURL: AJAX_PREFIX,
    timeout: AJAX_TIMEOUT,
    onError: handleError(toLogin),
    onSuccess: handleSuccess(),
    noEmpty: false,
    // withCredentials: true, // 跨域携带cookie，对应后端 Access-Control-Allow-Origin不可以为 '*'，需要指定为具体域名
});

// 请求拦截
ajax.instance.interceptors.request.use(
    (cfg) => {
        // 拼接成完整路由（作为子应用时需要）
        if (!cfg.url.startsWith('http')) {
            cfg.baseURL = `${AJAX_FULL_PREFIX}${cfg.baseURL}`;
        }

        if (!cfg.headers) cfg.headers = {};
        // 这里每次请求都会动态获取，放到创建实例中，只加载一次，有时候会出问题。
        cfg.headers['auth-token'] = getToken();
        return cfg;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// 响应拦截
ajax.instance.interceptors.response.use(
    (res) => {
        // Do something before response

        // 后端自定义失败，前端直接抛出，走handleError逻辑
        if (typeof res.data === 'object' && 'code' in res.data) {
            if (res.data.code !== 0) return Promise.reject(res.data);

            res.data = res.data.data;
        }

        return res;
    },
    (error) => {
        // Do something with response error
        return Promise.reject(error);
    }
);

const hooks = createHooks(ajax);
const hoc = createHoc(ajax);

export default ajax;

export const ajaxHoc = hoc;

export const get = ajax.get;
export const post = ajax.post;
export const put = ajax.put;
export const del = ajax.del;
export const patch = ajax.patch;
export const download = ajax.download;

export const useGet = hooks.useGet;
export const usePost = hooks.usePost;
export const usePut = hooks.usePut;
export const useDel = hooks.useDel;
export const usePatch = hooks.usePatch;
export const useDownload = hooks.useDownload;
