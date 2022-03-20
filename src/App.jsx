import {Suspense, useContext} from 'react';
import {useNavigate, useRoutes} from 'react-router';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {Layout} from 'src/components';
import {Loading, Error404, ComponentProvider} from '@ra-lib/component';
import routes, {menus} from 'src/pages/routes';
import {toHome} from 'src/commons';
import s from './App.module.less';
import {AppContext} from './app-context';
import theme from 'src/theme.less';
import 'antd/dist/antd.less';

// 设置 Modal、Message、Notification rootPrefixCls。
ConfigProvider.config({
    prefixCls: theme.antPrefix,
});

function App() {
    const navigate = useNavigate();
    const element = useRoutes([
        ...routes,
        { path: '*', element: <Error404 onToHome={toHome} onGoBack={() => navigate('../')}/> },
    ]);
    const { state } = useContext(AppContext);

    return (
        <ConfigProvider locale={zhCN} prefixCls={theme.antPrefix}>
            <ComponentProvider
                prefixCls={theme.raLibPrefix}
            >
                <Layout layout={state.layout} menus={menus}>
                    <Suspense fallback={<Loading spin/>}>
                        <div className={s.root}>
                            {element}
                        </div>
                    </Suspense>
                </Layout>
            </ComponentProvider>
        </ConfigProvider>
    );
}

export default App;
