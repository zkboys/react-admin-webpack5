import { Button } from 'antd';
import { PageContent } from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import s from './style.module.less';

export default config({
    // title: '首页', // 注释掉，不生成菜单
    auth: false,
    connect: (state) => {
        return {
            user: state.demo.user,
        };
    },
})(function Index(props) {
    const { user } = props;
    console.log('redux示例：', user);
    return (
        <PageContent className={s.root}>
            <h1>首页</h1>
            <Button onClick={() => props.action.demo.getUser()}>获取用户</Button>
        </PageContent>
    );
});
