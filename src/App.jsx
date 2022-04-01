import {Suspense, useContext, useEffect} from 'react';
import {useNavigate, useRoutes, useLocation} from 'react-router';
import {ConfigProvider, Modal} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {Layout} from 'src/components';
import {Loading, Error404, ComponentProvider, KeepPageAlive, getMainApp, setMainApp} from '@ra-lib/adm';
import routes from 'src/pages/routes';
import menus from 'src/pages/menus';
import {toHome} from 'src/commons';
import {AppContext} from './app-context';
import theme from 'src/theme.less';
import {modalDestroyAll} from 'src/commons/config-hoc';
import 'antd/dist/antd.less';
import {KEEP_PAGE_ALIVE, BASE_NAME} from 'src/config';
import s from './App.module.less';

// 设置 Modal、Message、Notification rootPrefixCls。
ConfigProvider.config({
    prefixCls: theme.antPrefix,
});

if (window.microApp) {
    const mainApp = window.microApp.getData() || {};
    setMainApp(mainApp);
}

export default function App() {
    // 路由页面注入的数据
    const ejectProps = {};
    const navigate = useNavigate();
    const location = useLocation();
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

    useEffect(() => {
        if (!window.microApp) return;
        // 监听主应用下发的数据变化
        window.microApp.addDataListener((data) => {
            // 当主应用下发跳转指令时进行跳转
            if (data.path) {
                navigate(data.path.replace(BASE_NAME, '/'));
            }

            // 更新主应用
            const mainApp = getMainApp();

            setMainApp({
                ...mainApp,
                ...data,
            });
        });
    }, [navigate]);

    return (
        <ConfigProvider locale={zhCN} prefixCls={theme.antPrefix}>
            <ComponentProvider prefixCls={theme.raLibPrefix}>
                <Layout layout={state.layout} menus={menus}>
                    <Suspense fallback={<Loading spin/>}>
                        {KEEP_PAGE_ALIVE ? (
                            <KeepPageAlive
                                routes={routes}
                                ejectProps={ejectProps}
                                baseName={BASE_NAME}
                                error404={error404}
                            />
                        ) : (
                            <div className={s.root}>{element}</div>
                        )}
                    </Suspense>
                </Layout>
            </ComponentProvider>
        </ConfigProvider>
    );
}
