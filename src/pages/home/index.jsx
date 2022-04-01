import {Button} from 'antd';
import {PageContent} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import {toLogin} from 'src/commons';
import s from './style.module.less';

export default config({
    // title: '首页', // 注释掉，不生成菜单
    auth: false,
})(function Index(props) {

    return (
        <PageContent className={s.root}>
            <h1>首页</h1>
            <Button type="primary" onClick={toLogin}>跳转登录</Button>
        </PageContent>
    );
});
