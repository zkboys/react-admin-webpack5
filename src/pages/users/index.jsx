import config from 'src/commons/config-hoc';

export default config({
    title: '用户',
})(function User(props) {
    return (
        <div>我是用户</div>
    );
});
