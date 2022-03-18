import {Outlet} from 'react-router';
import s from './style.module.less';

export default function Layout(props) {

    return (
        <div className={s.root}>
            <header>头部</header>
            <aside>左侧</aside>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}
