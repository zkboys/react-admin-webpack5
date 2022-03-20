import React, { useContext, useEffect } from 'react';
import { compose, queryParse } from '@ra-lib/util';
import { getLoginUser, toLogin } from 'src/commons';
import { AppContext } from 'src/app-context';
import { IS_SUB } from 'src/config';
import { ajaxHoc } from 'src/commons/ajax';
import {
    modal2 as modalHoc,
    modalFunction as modalFunctionHoc,
} from '@ra-lib/hoc';
import theme from 'src/theme.less';

// 公共高阶组件，注入一些常用数据，比如 query loginUser等
function commonHoc(options) {
    const {
        query = true,
        loginUser = true,
        layout = !IS_SUB,
        auth = true,
    } = options;
    return (WrappedComponent) => {
        const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

        const WithLayout = (props) => {
            // modalFunction 组件，AppContext是无法获取到的。
            const { setLayout } = useContext(AppContext) || {};

            useEffect(() => {
                setLayout && setLayout(layout);
            }, [setLayout]);

            if (auth && !getLoginUser()) return toLogin();

            // 默认添加属性到props中的属性
            const extendProps = {};
            if (query) extendProps.query = queryParse();
            if (loginUser) extendProps.loginUser = getLoginUser();

            return <WrappedComponent {...extendProps} {...props} />;
        };

        WithLayout.displayName = `WithCommon(${componentName})`;

        return WithLayout;
    };
}

export default function configHoc(options = {}) {
    // config 所有可用参数，以及默认值
    const {
        // 是否需要登录
        auth,
        // 是否显示框架
        layout,
        // 是否注入ajax
        ajax = true,
        // 是否是弹框
        modal,
        // 是否是弹框函数
        modalFunction,
        // 是否是抽屉
        drawer,
        drawerFunction,
        // 是否添加query参数
        // eslint-disable-next-line
        query = true,
        // 是否添加loginUser
        // eslint-disable-next-line
        loginUser = true,
        // eslint-disable-next-line
        ...others
    } = options;

    // config 传递 参数校验
    if (modal && drawer) throw Error('[config hoc] modal and drawer config can not be used together!');
    if (modalFunction && drawer) throw Error('[config hoc] modalFunction and drawer config can not be used together!');
    if (modal && modalFunction) throw Error('[config hoc] modal and modalFunction config can not be used together!');

    const hoc = [];
    const commonProps = {
        width: 800,
        footer: false,
        bodyStyle: { padding: 0 },
    };
    // 函数弹框组件
    if (modalFunction) hoc.push(modalFunctionHoc({ commonProps, antPrefix: theme.antPrefix, raLibPrefix: theme.raLibPrefix }));
    // 弹框高阶组件
    if (modal) hoc.push(modalHoc({ commonProps }));
    // 公共高阶组件
    hoc.push(commonHoc(options));
    // ajax高阶组件
    if (ajax) hoc.push(ajaxHoc());

    return compose(hoc);
}
