import {Button} from 'antd';
import {PageContent} from 'src/components';
import s from './style.module.less';

export default function Index() {

    return (
        <PageContent className={s.root}>
            <Button type="primary">我是首页</Button>
        </PageContent>
    );
}
