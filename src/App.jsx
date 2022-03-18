import {useRoutes} from 'react-router';
import {Error404} from 'src/components';
import routes from 'src/pages/routes';
import s from './App.module.less';

function App() {
    const element = useRoutes([
        ...routes,
        { path: '*', element: <Error404/> },
    ]);
    return (
        <div className={s.root}>
            {element}
        </div>
    );
}

export default App;
