import { useParams } from 'react-router';
import config from 'src/commons/config-hoc';

export default config({
    title: '用户详情22',
})(function UserDetail(props) {
    const params = useParams();
    console.log(params);
    return (
        <div>我是用户详情{params.userId}</div>
    );
});
