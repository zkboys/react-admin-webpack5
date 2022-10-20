import {Suspense, useEffect, useState} from 'react';
import {useNavigate, useRoutes, useLocation} from 'react-router';
import {ConfigProvider, Modal} from 'antd';
import {Provider} from 'react-redux';
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
    isLoginPage,
} from '@ra-lib/adm';
import {Logo} from 'src/components';
import routes from 'src/routes';
import menus from 'src/menus';
import {toHome, toLogin, getCurrentPageConfig} from 'src/commons';
import {store} from './models';
import useAppContext from './app-context';
import theme from 'src/theme.less';
import {modalDestroyAll} from 'src/commons/config-hoc';
import 'antd/dist/antd.less';
import {KEEP_PAGE_ALIVE, BASE_NAME, SHOW_PROXY, IGNORE_PERMISSION} from 'src/config';
import proxyConfig from 'src/setupProxyConfig.json';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import ajax from 'src/commons/ajax';

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
        (async () => {
            try {
                if (isLoginPage()) return;

                // TODO 请求用户
                // const result = await ajax.get('/user/getSystemUser');
                // const { realName: name, id, ...others } = result.object || {};
                const token = getToken();
                const loginUser = {
                    ignorePermission: IGNORE_PERMISSION,
                    // ...others,
                    id: '1',
                    name: 'text',
                    token,
                };

                // 获取权限
                // const res = await ajax.get('/user/authority/getUserAuthCode');
                // loginUser.permissions = res.data || [];
                console.log(loginUser);
                setLoginUser(loginUser);
            } finally {
                setLoading(false);
            }
        })();
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
                        <Loading sping/>
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
                            <Suspense fallback={<Loading spin/>}>
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
