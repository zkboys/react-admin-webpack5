import {useState} from 'react';
import Header from './Header';
import s from './style.module.less';

export default function Layout(props) {
    const { layout, menus, selectedMenuPath, keepMenuOpen = true, proxyVisible, Logo, onLogout, proxyConfig } = props;
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <div className={s.root} style={{ display: layout ? 'block' : 'none' }}>
                <Header
                    key={layout ? 'block' : 'none'} // 解决editor页面返回时，菜单不显示问题
                    collapsed={collapsed}
                    onCollapsedChange={setCollapsed}
                    proxyVisible={proxyVisible}
                    Logo={Logo}
                    onLogout={onLogout}
                    proxyConfig={proxyConfig}
                    menus={menus}
                    selectedMenuPath={selectedMenuPath}
                    keepMenuOpen={keepMenuOpen}
                />
            </div>
            {layout ? <div className={s.rootSpace}/> : null}
            {props.children}
        </>
    );
}
