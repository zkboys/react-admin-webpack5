import { Suspense } from 'react';
import { useRoutes } from 'react-router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Error404, Layout, PageLoading } from 'src/components';
import routes, { menus } from 'src/pages/routes';
import s from './App.module.less';

function App() {
    const element = useRoutes([
        ...routes,
        { path: '*', element: <Error404 /> },
    ]);
    return (
        <ConfigProvider locale={zhCN}>
            <Layout frame menus={menus}>
                <Suspense fallback={<PageLoading />}>
                    <div className={s.root}>
                        {element}
                    </div>
                </Suspense>
            </Layout>
        </ConfigProvider>
    );
}

export default App;
