import {Suspense, useContext, useEffect} from 'react';
import {useNavigate, useRoutes, useLocation} from 'react-router';
import {ConfigProvider, Modal} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {Layout} from 'src/components';
import {Loading, Error404, ComponentProvider} from '@ra-lib/adm';
import routes from 'src/pages/routes';
import menus from 'src/pages/menus';
import {toHome} from 'src/commons';
import {AppContext} from './app-context';
import theme from 'src/theme.less';
import {modalDestroyAll} from 'src/commons/config-hoc';
import 'antd/dist/antd.less';
import s from './App.module.less';

// 设置 Modal、Message、Notification rootPrefixCls。
ConfigProvider.config({
    prefixCls: theme.antPrefix,
});

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const element = useRoutes([
        ...routes,
        { path: '*', element: <Error404 onToHome={toHome} onGoBack={() => navigate('../')}/> },
    ]);
    const { state } = useContext(AppContext);

    // 页面切换，关闭所有弹框
    useEffect(() => {
        Modal.destroyAll();
        modalDestroyAll();
    }, [location]);

    return (
        <ConfigProvider locale={zhCN} prefixCls={theme.antPrefix}>
            <ComponentProvider prefixCls={theme.raLibPrefix}>
                <Layout layout={state.layout} menus={menus}>
                    <Suspense fallback={<Loading spin/>}>
                        <div className={s.root}>{element}</div>
                    </Suspense>
                </Layout>
            </ComponentProvider>
        </ConfigProvider>
    );
}
