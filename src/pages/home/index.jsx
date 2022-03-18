import { Button } from 'antd';
import { PageContent } from 'src/components';
import myModal from './myModal';
import config from 'src/commons/config-hoc';
import s from './style.module.less';

export default config({
    title: '首页',
})(function Index(props) {
    return (
        <PageContent className={s.root}>
            <h1>我是首页</h1>
            <Button
                type="primary"
                onClick={() => myModal({
                    onOk: async () => {
                        // 这两种方式都可以阻止关闭弹框
                        // throw Error('');
                        // return false;
                    },
                })}
            >好的</Button>
        </PageContent>
    );
});
