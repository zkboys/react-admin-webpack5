import {Button, Upload, Space, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {PageContent} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import {toLogin} from 'src/commons';
import {AJAX_FULL_PREFIX} from 'src/config';
import s from './style.module.less';

export default config({
    // title: '首页', // 注释掉，不生成菜单
    auth: false,
})(function Index(props) {

    const uploadProps = {
        name: 'file',
        action: `${AJAX_FULL_PREFIX}/api/upload`,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <PageContent className={s.root}>
            <h1>首页</h1>
            <a href={`${AJAX_FULL_PREFIX}/api/upload`}>请求</a>
            <Space>
                <Button type="primary" onClick={toLogin}>跳转登录</Button>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
            </Space>
        </PageContent>
    );
});
