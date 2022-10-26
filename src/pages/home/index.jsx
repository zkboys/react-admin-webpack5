import {useState} from 'react';
import {PageContent, DatePickerLong} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import s from './style.module.less';

export default config({
    auth: false,
})(function Index(props) {
    const [date, setDate] = useState();
    console.log(date);
    return (
        <PageContent className={s.root}>
            <h1>首页</h1>
            <DatePickerLong
                value={date}
                onChange={setDate}
                longValue="long"
            />
        </PageContent>
    );
});
