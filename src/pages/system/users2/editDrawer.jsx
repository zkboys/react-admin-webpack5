import {useCallback, useState, useEffect} from 'react';
import {Form, Row, Col, Drawer} from 'antd';
import {FormItem, DrawerContent} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';

export default config({
    modalFunction: true,
})(function UserEditDrawer(props) {
    const { record, isEdit, close, commonProps } = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = useCallback(async (values) => {
        const params = {
            ...values,
        };
        if (isEdit) {
            await props.ajax.put('/users', params, { setLoading, successTip: '修改成功！' });
        } else {
            await props.ajax.post('/users', params, { setLoading, successTip: '创建成功！' });
        }

        close();
    }, [isEdit, close, props.ajax]);

    // 初始化，查询详情数据
    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            const res = await props.ajax.get('/users', { id: record?.id }, [], { setLoading });
            form.setFieldsValue(res || {});
        })();
    }, [isEdit, form, props.ajax, record?.id]);

    const layout = { labelCol: { flex: '100px' } };
    return (
        <Drawer
            {...commonProps}
            title={record ? '修改用户' : '添加用户'}
        >
            <Form form={form} onFinish={handleSubmit}>
                <DrawerContent
                    loading={loading}
                    okText="保存"
                    okHtmlType="submit"
                    cancelText="重置"
                    onCancel={() => form.resetFields()}
                >
                    {isEdit ? <FormItem hidden name="id"/> : null}
                    <Row>
                        <Col span={12}>
                            <FormItem
                                {...layout}
                                type="input"
                                label="用户名"
                                name="userName"
                                maxLength={50}
                                required
                            />
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...layout}
                                type="input"
                                label="年龄"
                                name="age"
                                maxLength={50}
                                required
                            />
                        </Col>
                    </Row>
                </DrawerContent>
            </Form>
        </Drawer>
    );
});
