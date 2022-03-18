import { useRoutes } from 'react-router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Error404 } from 'src/components';
import routes from 'src/pages/routes';
import s from './App.module.less';

function App() {
    const element = useRoutes([
        ...routes,
        { path: '*', element: <Error404 /> },
    ]);
    return (
        <ConfigProvider locale={zhCN}>
            <div className={s.root}>
                {element}
            </div>
        </ConfigProvider>
    );
}

export default App;
