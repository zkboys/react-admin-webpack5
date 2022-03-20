import config from 'src/commons/config-hoc';
import { PageContent } from '@ra-lib/component';

export default config({
    title: '角色',
    parentTitle: '角色管理',
})(function Role(props) {
    return (
        <PageContent>我是角色22</PageContent>
    );
});
