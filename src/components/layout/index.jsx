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
            <header className={s.header}>
                <div className={s.logo}>React Admin</div>
                <div className={s.headerMain}>
                    退出登录
                </div>
            </header>

            <main className={s.main}>
                <aside className={s.aside}>
                    <Menu
                        theme={'dark'}
                        mode="inline"
                    >
                        {renderMenu()}
                    </Menu>
                </aside>
                <div className={s.page}>
                    {props.children}
                </div>
            </main>
        </div>
    );
}
