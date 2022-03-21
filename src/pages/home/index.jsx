import {useState} from 'react';
import {Button, Space} from 'antd';
import {PageContent} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import {toLogin} from 'src/commons';
import myModal from './myModal';
import MyModal2 from './MyModal2';
import s from './style.module.less';

export default config({
    // title: '首页', // 注释掉，不生成菜单
})(function Index(props) {
    console.log('首页 render');

    const [visible, setVisible] = useState(false);

    return (
        <PageContent className={s.root}>
            <div
                style={{
                    height: 2000,
                    // background: 'yellowgreen',
                }}
            >
                <h1>我是首页</h1>
                <Space>
                    <Button onClick={() => toLogin()}>登录</Button>
                    <Button
                        type="primary"
                        onClick={() => myModal({
                            onOk: async () => {
                                // 这两种方式都可以阻止关闭弹框
                                // throw Error('');
                                // return false;
                            },
                        })}
                    >我的弹框</Button>
                    <Button
                        type="primary"
                        onClick={() => setVisible(true)}
                    >我的弹框2</Button>
                </Space>
            </div>
            <MyModal2 visible={visible} onCancel={() => setVisible(false)}/>
        </PageContent>
    );
});
