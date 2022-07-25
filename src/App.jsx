import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useRoutes, useLocation } from 'react-router';
import { ConfigProvider, Modal } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {
    Loading,
    Error404,
    ComponentProvider,
    KeepPageAlive,
    // useMainAppDataListener,
    Layout,
    setLoginUser,
    getToken,
    getLoginUser,
} from '@ra-lib/adm';
import { Logo } from 'src/components';
import routes from 'src/routes';
import menus from 'src/menus';
import { toHome, toLogin, getCurrentPageConfig } from 'src/commons';
import { store } from './models';
import useAppContext from './app-context';
import theme from 'src/theme.less';
import { modalDestroyAll } from 'src/commons/config-hoc';
import 'antd/dist/antd.less';
import { KEEP_PAGE_ALIVE, BASE_NAME, SHOW_PROXY } from 'src/config';
import proxyConfig from 'src/setupProxyConfig.json';
import moment from 'moment';
import 'moment/locale/zh-cn'; // 解决antd日期相关组件国际化问题

// 设置语言
moment.locale('zh-cn');

// 设置 Modal、Message、Notification rootPrefixCls
ConfigProvider.config({
    prefixCls: theme.antPrefix,
});

export default function App() {
    // 路由页面注入的数据
    const ejectProps = {};
    const { state } = useAppContext();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const error404 = (
        <Error404
            {...ejectProps}
            onToHome={toHome}
            onGoBack={() => navigate('../')}
        />
    );
    const element = useRoutes([
        ...routes.map((item) => {
            const { Component } = item;
            return {
                ...item,
                element: <Component {...ejectProps} />,
            };
        }),
        { path: '*', element: error404 },
    ]);

    // 页面切换，关闭所有弹框
    useEffect(() => {
        Modal.destroyAll();
        modalDestroyAll();
    }, [location]);

    useEffect(() => {
        const loginUser = getLoginUser();

        // 嵌入老门户，没有用户，设置个mock用户
        if (!loginUser) {
            const token = getToken();
            setLoginUser({
                id: '1',
                name: 'text',
                token,
            });
        }
        setLoading(false);
    }, []);

    // 监听主应用数据
    // useMainAppDataListener({ navigate, onFinish: () => setLoading(false) });

    const pageConfig = getCurrentPageConfig();
    return (
        <Provider store={store}>
            <ConfigProvider
                locale={zhCN}
                prefixCls={theme.antPrefix}
            >
                <ComponentProvider prefixCls={theme.raLibPrefix}>
                    {loading ? (
                        <Loading sping />
                    ) : (
                        <Layout
                            layout={state.layout}
                            menus={menus}
                            selectedMenuPath={pageConfig?.selectedMenuPath}
                            proxyVisible={SHOW_PROXY}
                            Logo={Logo}
                            proxyConfig={proxyConfig}
                            onLogout={() => {
                                // TODO 退出登录
                                alert('// TODO 退出登录');
                                toLogin();
                            }}
                        >
                            <Suspense fallback={<Loading spin />}>
                                {KEEP_PAGE_ALIVE ? (
                                    <KeepPageAlive
                                        routes={routes}
                                        ejectProps={ejectProps}
                                        baseName={BASE_NAME}
                                        error404={error404}
                                    />
                                ) : (
                                    <div style={{ overflow: 'auto' }}>{element}</div>
                                )}
                            </Suspense>
                        </Layout>
                    )}
                </ComponentProvider>
            </ConfigProvider>
        </Provider>
    );
}
