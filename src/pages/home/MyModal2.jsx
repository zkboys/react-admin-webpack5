import { useCallback } from 'react';
import { Modal } from 'antd';
import { Content } from '@ra-lib/adm';
import config from 'src/commons/config-hoc';

export default config({
    modal: true,
})(function MyModal2(props) {
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
                弹框
            </Content>
        </Modal>
    );
});
