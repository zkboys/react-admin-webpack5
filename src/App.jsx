import {Suspense, useContext, useEffect, useState} from 'react';
import {useNavigate, useRoutes, useLocation} from 'react-router';
import {ConfigProvider, Modal} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {Loading, Error404, ComponentProvider, KeepPageAlive, useMainAppDataListener, Layout} from '@ra-lib/adm';
import {Logo} from 'src/components';
import routes from 'src/routes';
import menus from 'src/menus';
import {toHome, toLogin} from 'src/commons';
import {AppContext} from './app-context';
import theme from 'src/theme.less';
import {modalDestroyAll} from 'src/commons/config-hoc';
import 'antd/dist/antd.less';
import {KEEP_PAGE_ALIVE, BASE_NAME, SHOW_PROXY, SUB_APP_NAME, IS_SUB} from 'src/config';
import proxyConfig from 'src/setupProxyConfig.json';

// 设置 Modal、Message、Notification rootPrefixCls。
ConfigProvider.config({
    prefixCls: theme.antPrefix,
});

export default function App() {
    const [loading, setLoading] = useState(true);
    // 路由页面注入的数据
    const ejectProps = {};
    const navigate = useNavigate();
    const location = useLocation();
    // 监听主应用数据
    useMainAppDataListener({ navigate, name: SUB_APP_NAME, isSub: IS_SUB, setLoading });

    const error404 = <Error404 {...ejectProps} onToHome={toHome} onGoBack={() => navigate('../')}/>;
    const element = useRoutes([
        ...routes.map(item => {
            const { Component } = item;
            return {
                ...item,
                element: <Component {...ejectProps}/>,
            };
        }),
        { path: '*', element: error404 },
    ]);
    const { state } = useContext(AppContext);

    // 页面切换，关闭所有弹框
    useEffect(() => {
        Modal.destroyAll();
        modalDestroyAll();
    }, [location]);

    if (loading) return <Loading spin/>;

    return (
        <ConfigProvider locale={zhCN} prefixCls={theme.antPrefix}>
            <ComponentProvider prefixCls={theme.raLibPrefix}>
                <Layout
                    layout={state.layout}
                    menus={menus}
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
            </ComponentProvider>
        </ConfigProvider>
    );
}
