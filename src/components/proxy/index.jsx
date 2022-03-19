import { useCallback, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { ApiOutlined, DownOutlined } from '@ant-design/icons';
import proxyConfig from 'src/setupProxyConfig';
// import { SHOW_PROXY } from 'src/config';
import s from './style.module.less';


const SHOW_PROXY = true;

export default function Proxy(props) {
    const [selectedKeys, setSelectedKeys] = useState([window.localStorage.getItem('AJAX_PREFIX') || '/api']);

    const handleSelect = useCallback((baseUrl) => {
        setSelectedKeys([baseUrl]);
        window.localStorage.setItem('AJAX_PREFIX', baseUrl);
        window.location.reload();
    }, []);

    // 非开发 测试环境 不显示
    if (!SHOW_PROXY) return null;

    const serverMenu = (
        <Menu selectedKeys={selectedKeys}>
            {proxyConfig
                .filter((item) => !item.disabled)
                .map((item) => {
                    const { baseUrl, name } = item;
                    return (
                        <Menu.Item
                            key={baseUrl}
                            icon={<ApiOutlined />}
                            onClick={() => handleSelect(baseUrl)}
                        >
                            {name}
                        </Menu.Item>
                    );
                })}
        </Menu>
    );

    return (
        <Dropdown overlay={serverMenu}>
            <div className={s.root}>
                <ApiOutlined className={s.icon} />
                <div className={s.name}>
                    {proxyConfig.find((item) => selectedKeys?.includes(item.baseUrl))?.name}
                </div>
                <DownOutlined />
            </div>
        </Dropdown>
    );
}