import { useState, useEffect } from 'react';
import { Form, Row, Col, Modal } from 'antd';
import { FormItem, ModalContent, useFunction } from '@ra-lib/adm';
import config from 'src/commons/config-hoc';

export default config({
    modalFunction: true,
})(function UserEditModal(props) {
    const { record, close, commonProps, onOk } = props;
    const isEdit = !!record;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = useFunction(async (values) => {
        const params = {
            ...values,
        };
        if (isEdit) {
            await props.ajax.put('/users', params, { setLoading, successTip: '修改成功！' });
        } else {
            await props.ajax.post('/users', params, { setLoading, successTip: '创建成功！' });
        }

        onOk && onOk();
        close();
    });

    // 初始化，查询详情数据
    useEffect(() => {
        (async () => {
            if (!isEdit) return;
            const res = await props.ajax.get('/users', { id: record?.id }, [], { setLoading });
            form.setFieldsValue(res || {});
        })();
    }, [isEdit, form, props.ajax, record?.id]);

    const layout = { labelCol: { flex: '100px' } };
    return (
        <Modal
            {...commonProps}
            title={record ? '修改用户' : '添加用户'}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                {...layout}
            >
                <ModalContent
                    loading={loading}
                    okText="保存"
                    okHtmlType="submit"
                    cancelText="重置"
                    onCancel={() => form.resetFields()}
                >
                    {isEdit ? (
                        <FormItem
                            hidden
                            name="id"
                        />
                    ) : null}
                    <Row>
                        <Col span={12}>
                            <FormItem
                                type="input"
                                label="用户名"
                                name="userName"
                                maxLength={50}
                                required
                            />
                        </Col>
                        <Col span={12}>
                            <FormItem
                                type="input"
                                label="年龄"
                                name="age"
                                maxLength={50}
                                required
                            />
                        </Col>
                    </Row>
                </ModalContent>
            </Form>
        </Modal>
    );
});
