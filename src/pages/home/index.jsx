import {Button} from 'antd';
import {PageContent} from 'src/components';
import myModal from './myModal';
import s from './style.module.less';

export default function Index() {

    return (
        <PageContent className={s.root}>
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
}
