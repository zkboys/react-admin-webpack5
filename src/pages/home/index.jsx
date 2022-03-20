import {Button, Space} from 'antd';
import {PageContent} from '@ra-lib/component';
import config from 'src/commons/config-hoc';
import {toLogin} from 'src/commons';
import myModal from './myModal';
import s from './style.module.less';

export default config({
    title: '首页',
})(function Index(props) {
    console.log('首页 render');
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
                </Space>
            </div>
        </PageContent>
    );
});
