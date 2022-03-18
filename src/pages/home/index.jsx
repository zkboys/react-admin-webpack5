import {Button} from 'antd';
import {PageContent} from 'src/components';
import s from './style.module.less';

export default function Index() {

    console.log(123123);

    return (
        <PageContent className={s.root}>
            <Button type="primary">好的</Button>
        </PageContent>
    );
}
