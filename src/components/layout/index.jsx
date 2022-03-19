import { Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import s from './style.module.less';
import { useCallback } from 'react';
import { Proxy } from '../index';

export default function Layout(props) {
    const { frame, menus } = props;

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
    }, [menus]);

    const handleLogout = useCallback(() => {
        // TODO
    }, []);

    if (!frame) return props.children;

    // TODO
    const name = '测试';

    return (
        <div className={s.root}>
            <header className={s.header}>
                <div className={s.logo}>
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                        alt="logo"
                    />
                    <span>React Admin</span>
                </div>
                <div className={s.headerMain}>
                    <Proxy />
                    <Dropdown
                        overlay={(
                            <Menu>
                                <Menu.Divider />
                                <Menu.Item key="logout" danger icon={<LogoutOutlined />} onClick={handleLogout}>
                                    退出登录
                                </Menu.Item>
                            </Menu>
                        )}
                    >
                        <div className={s.action}>
                            <Avatar size="small" className={s.avatar}>
                                {(name[0] || '').toUpperCase()}
                            </Avatar>
                            <span className={s.userName}>{name}</span>
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </header>
            <aside className={s.aside}>
                <Menu
                    theme={'dark'}
                    mode="inline"
                >
                    {renderMenu()}
                </Menu>
            </aside>
            <main className={s.main}>
                {props.children}
            </main>
        </div>
    );
}
