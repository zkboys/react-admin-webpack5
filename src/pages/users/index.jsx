import {Form} from 'antd';
import {FormItem, QueryBar, PageContent} from '@ra-lib/component';
import config from 'src/commons/config-hoc';

export default config({
    title: '用户查询2',
})(function User(props) {
    return (
        <PageContent>
            <Form>
                <QueryBar>
                    <FormItem
                        type="input"
                        label="用户名"
                        name="name"
                    />
                </QueryBar>
            </Form>
        </PageContent>
    );
});
