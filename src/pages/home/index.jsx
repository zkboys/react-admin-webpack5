import {useState} from 'react';
import {PageContent, DatePickerLong} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import s from './style.module.less';
import {Button} from 'antd';
import {useModel} from 'src/models';

export default config({
    auth: false,
})(function Index(props) {
    const [ date, setDate ] = useState();
    const [ user, demoAction ] = useModel('demo.user');
    console.log('user', user);
    return (
        <PageContent className={s.root}>
            <h1>首页</h1>
            <DatePickerLong
                value={date}
                onChange={setDate}
                longValue="long"
            />
            <Button onClick={() => demoAction.getUser()}>获取用户</Button>
        </PageContent>
    );
});
