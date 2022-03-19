import { Button } from 'antd';
import { PageContent } from 'src/components';
import myModal from './myModal';
import config from 'src/commons/config-hoc';
import s from './style.module.less';
import { useContext } from 'react';
import { toLogin } from 'src/commons';
import { AppContext } from '../../app-context';

export default config({
    title: '首页',
})(function Index(props) {
    const { state, setFrame } = useContext(AppContext);
    return (
        <PageContent className={s.root}>
            <div
                style={{
                    height: 2000,
                    // background: 'yellowgreen',
                }}
            >
                <h1>我是首页</h1>
                <Button onClick={() => toLogin()}>登录</Button>
                <Button onClick={() => setFrame(!state.frame)}>切换frame</Button>
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
            </div>
        </PageContent>
    );
});
