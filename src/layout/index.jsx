import { Outlet } from 'react-router';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { menus } from 'src/pages/routes';
import s from './style.module.less';

export default function Layout(props) {

    return (
        <div className={s.root}>
            <header>头部</header>
            <aside>
                <Menu
                    style={{ width: 256 }}
                    mode="inline"
                >
                    {menus.map(item => {
                        const { key, path, title } = item;
                        return (
                            <Menu.Item key={key}>
                                <Link key={key} to={path}>
                                    {title}
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
