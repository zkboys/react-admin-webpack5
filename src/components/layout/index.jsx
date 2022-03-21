import {useState} from 'react';
import Header from './Header';
import Aside from './Aside';
import c from 'classnames';
import s from './style.module.less';

export default function Layout(props) {
    const { layout, menus, keepMenuOpen = true } = props;
    const [collapsed, setCollapsed] = useState(false);

    if (!layout) return props.children;

    return (
        <div className={s.root}>
            <Header collapsed={collapsed} onCollapsedChange={setCollapsed}/>
            <Aside menus={menus} collapsed={collapsed} keepMenuOpen={keepMenuOpen}/>
            <main className={c(s.main, collapsed && s.collapsed)}>
                {props.children}
            </main>
        </div>
    );
}
