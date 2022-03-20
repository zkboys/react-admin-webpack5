import { useCallback, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { findParentNodes } from '@ra-lib/util';
import { toLogin, getLoginUser } from 'src/commons';
import { Proxy, Logo } from '../index';
import s from './style.module.less';

export default function Layout(props) {
    const { layout, menus, keepMenuOpen = true } = props;
    const [selectedKeys, setSelectedKeys] = useState([window.location.pathname]);
    const [openKeys, setOpenKeys] = useState([]);
    const openKeysRef = useRef([]);

    // 计算openKeys
    useEffect(() => {
        const key = selectedKeys?.[0];
        if (!key) return;
        const nodes = findParentNodes(menus, key, 'path');
        const keys = nodes.map(item => item.id);
        const openKeys = keepMenuOpen ? Array.from(new Set([...keys, ...openKeysRef.current])) : keys;
        setOpenKeys(openKeys);
    }, [menus, selectedKeys, keepMenuOpen]);

    useEffect(() => {
        openKeysRef.current = openKeys;
    }, [openKeys]);

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
                <Menu.Item key={path}>
                    <Link key={id} to={path}>
                        {title}
                    </Link>
                </Menu.Item>
            );
        });
        return loop(menus);
    }, [menus]);

    const handleLogout = useCallback(() => {
        alert('// TODO 退出登录');
        toLogin();
    }, []);

    if (!layout) return props.children;

    const userName = getLoginUser()?.name;

    return (
        <div className={s.root}>
            <header className={s.header}>
                <div className={s.logo}>
                    <Logo />
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
                                {(userName[0] || '').toUpperCase()}
                            </Avatar>
                            <span className={s.userName}>{userName}</span>
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </header>
            <aside className={s.aside}>
                <Menu
                    theme={'dark'}
                    mode="inline"
                    selectedKeys={selectedKeys}
                    onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
                    openKeys={openKeys}
                    onOpenChange={openKeys => setOpenKeys(openKeys)}
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
