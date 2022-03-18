import { Outlet } from 'react-router';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { menus } from 'src/pages/routes';
import s from './style.module.less';
import { useCallback } from 'react';

export default function Layout(props) {

    const renderMenu = useCallback(() => {
        const loop = nodes => nodes.map(item => {
            const { id, path, title, children } = item;
            if (children?.length) {
                // 使二级菜单排在最后
                children.sort((a, b) => {
                    const acl = a.children?.length || 0;
                    const bcl = b.children?.length || 0;
                    return acl - bcl;
                });
                return (
                    <Menu.SubMenu key={id} title={title}>
                        {loop(children)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={id}>
                    <Link key={id} to={path}>
                        {title}
                    </Link>
                </Menu.Item>
            );
        });
        return loop(menus);
    }, []);
    return (
        <div className={s.root}>
            <header>头部</header>
            <aside>
                <Menu
                    theme={'dark'}
                    style={{ width: 256 }}
                    mode="inline"
                >
                    {renderMenu()}
                </Menu>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
