import { Spin } from 'antd';
import s from './style.module.less';

export default function PageLoading(props) {

    return (
        <div
            className={s.root}
        >
            <Spin spinning />
        </div>
    );
}
