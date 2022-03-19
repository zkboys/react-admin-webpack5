import config from 'src/commons/config-hoc';
import { PageContent } from 'src/components';

export default config({
    title: '角色',
    parentTitle: '角色管理',
})(function Role(props) {
    return (
        <PageContent>我是角色</PageContent>
    );
});
