import {useEffect, useMemo, useState} from 'react';
import {Menu, Dropdown, Avatar} from 'antd';
import {LogoutOutlined, DownOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from 'react-router';
import {useFunction, Proxy, getLoginUser} from '@ra-lib/adm';
import c from 'classnames';
import s from './style.module.less';

export default function Header(props) {
    const {
        menus,
        collapsed,
        proxyVisible,
        Logo,
        onLogout,
        proxyConfig,
        selectedMenuPath,
    } = props;
    const navigate = useNavigate();

    const [selectedKeys, setSelectedKeys] = useState([]);
    const location = useLocation();

    const items = useMemo(() => {
        const loop = nodes => nodes.map(item => {
            const { path, id, title, children } = item;

            return {
                key: path || id,
                label: title,
                children: children?.length ? loop(children) : undefined,
            };
        });
        return loop(menus);
    }, [menus]);

    const handleMenuItemClick = useFunction((info) => {
        const { key } = info;
        navigate(key);
    });

    const handleLogout = useFunction(() => {
        if (onLogout) onLogout();
    });

    const userMenuItems = useMemo(() => {
        return [
            {
                key: 'logout',
                label: '退出登录',
                danger: true,
                icon: <LogoutOutlined/>,
                onClick: handleLogout,
            },
        ];
    }, []);

    // 页面切换，选中菜单
    useEffect(() => setSelectedKeys([selectedMenuPath || location.pathname]), [location, selectedMenuPath]);

    const userName = getLoginUser()?.name || '';

    console.log(items);

    return (
        <header className={s.header}>
            <div className={c(s.logo, collapsed && s.collapsed)} onClick={() => navigate('/')}>
                <Logo simple={collapsed}/>
            </div>
            <div className={s.headerMain}>
                <div className={s.headerCenter}>
                    <Menu
                        theme={'dark'}
                        mode="horizontal"
                        selectedKeys={selectedKeys}
                        onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
                        onClick={handleMenuItemClick}
                        items={items}
                    />
                </div>
                <div className={s.headerRight}>
                    <Proxy visible={proxyVisible} proxyConfig={proxyConfig}/>
                    <Dropdown overlay={<Menu items={userMenuItems}/>}>
                        <div className={s.action}>
                            <Avatar size="small" className={s.avatar}>
                                {(userName[0] || '').toUpperCase()}
                            </Avatar>
                            <span className={s.userName}>{userName}</span>
                            <DownOutlined/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
