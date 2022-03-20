import config from 'src/commons/config-hoc';
import { PageContent } from '@ra-lib/component';

export default config({
    title: '角色详情',
})(function RoleDetail(props) {
    return (
        <PageContent>我是角色详情</PageContent>
    );
});
