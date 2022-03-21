import { useCallback } from 'react';
import { Form, Modal } from 'antd';
import { Content, FormItem } from '@ra-lib/adm';
import config from 'src/commons/config-hoc';

export default config({
    modalFunction: true,
})(function MyModal(props) {
    const { commonProps, onOk, close } = props;
    console.log(props);
    const handleOk = useCallback(async () => {
        const ok = onOk && await onOk();
        if (ok === false) return;
        close();
    }, [close, onOk]);
    return (
        <Modal
            {...commonProps}
            title="我的弹框"
            onOk={handleOk}
        >
            <Content>
                <Form>
                    <FormItem
                        type="input"
                        label="用户名"
                        name="name"
                    />
                </Form>
            </Content>
        </Modal>
    );
});
